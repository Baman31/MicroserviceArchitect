# Multi-stage Docker build for TechVantage Solutions webapp

# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY client/ ./client/
COPY server/ ./server/
COPY shared/ ./shared/

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/client/dist ./client/dist/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S techvantage -u 1001

# Change ownership of the app directory
RUN chown -R techvantage:nodejs /app
USER techvantage

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]