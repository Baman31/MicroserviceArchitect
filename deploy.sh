#!/bin/bash

# TechVantage Solutions Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOCKER_REGISTRY="your-registry"
IMAGE_NAME="techvantage-webapp"
VERSION=${1:-latest}
NAMESPACE="techvantage"

echo -e "${GREEN}Starting TechVantage Solutions Deployment${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
if ! command_exists docker; then
    echo -e "${RED}Docker is not installed${NC}"
    exit 1
fi

if ! command_exists kubectl; then
    echo -e "${RED}kubectl is not installed${NC}"
    exit 1
fi

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${VERSION} .
docker tag ${DOCKER_REGISTRY}/${IMAGE_NAME}:${VERSION} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest

# Push to registry
echo -e "${YELLOW}Pushing image to registry...${NC}"
docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest

# Create namespace if it doesn't exist
echo -e "${YELLOW}Creating namespace...${NC}"
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
echo -e "${YELLOW}Deploying to Kubernetes...${NC}"

# Apply ConfigMap
kubectl apply -f k8s-configmap.yaml -n ${NAMESPACE}

# Apply Secrets (you should create this manually for security)
echo -e "${YELLOW}Note: Please ensure secrets are created manually for security${NC}"
echo "kubectl create secret generic techvantage-secrets \\"
echo "  --from-literal=database-url=\"postgresql://username:password@host:port/database\" \\"
echo "  --from-literal=sentry-dsn=\"https://your-sentry-dsn@sentry.io\" \\"
echo "  -n ${NAMESPACE}"

# Apply Deployment and Service
kubectl apply -f k8s-deployment.yaml -n ${NAMESPACE}

# Apply HPA
kubectl apply -f k8s-hpa.yaml -n ${NAMESPACE}

# Apply Ingress
kubectl apply -f k8s-deployment.yaml -n ${NAMESPACE}

# Wait for deployment to be ready
echo -e "${YELLOW}Waiting for deployment to be ready...${NC}"
kubectl rollout status deployment/techvantage-webapp -n ${NAMESPACE} --timeout=300s

# Get deployment status
echo -e "${GREEN}Deployment Status:${NC}"
kubectl get pods -n ${NAMESPACE} -l app=techvantage-webapp
kubectl get svc -n ${NAMESPACE}
kubectl get ingress -n ${NAMESPACE}

echo -e "${GREEN}Deployment completed successfully!${NC}"

# Show logs
echo -e "${YELLOW}Recent logs:${NC}"
kubectl logs -n ${NAMESPACE} -l app=techvantage-webapp --tail=10