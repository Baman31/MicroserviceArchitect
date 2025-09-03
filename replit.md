# Overview

TechVantage Solutions is a professional IT services company website targeting businesses in Jaipur, Rajasthan, and India. The platform serves as a comprehensive digital presence for showcasing IT services, generating leads, and establishing market credibility. Built with modern web technologies, it features a full-stack architecture with React frontend, Express backend, PostgreSQL database, and comprehensive content management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Wouter** for lightweight client-side routing instead of React Router
- **Vite** as the build tool for fast development and optimized production builds
- **TanStack Query** for server state management and API caching
- **Tailwind CSS** with **shadcn/ui** component library for consistent design system
- **Radix UI** primitives for accessible, unstyled component foundations
- **React Hook Form** with Zod validation for robust form handling

## Backend Architecture
- **Express.js** server with TypeScript for type safety
- **RESTful API** design with structured route handlers in `/server/routes.ts`
- **Storage abstraction layer** in `/server/storage.ts` for flexible data access patterns
- **Middleware pipeline** for request logging, error handling, and JSON parsing
- **Development/production environment** configuration with Vite integration

## Database Design
- **PostgreSQL** as the primary database with Neon serverless hosting
- **Drizzle ORM** for type-safe database operations and migrations
- **Schema-first approach** with shared TypeScript types between frontend/backend
- **Entity structure**: Users, Projects, Testimonials, Blog Posts, Contacts, and Quotes
- **JSON fields** for flexible data like technologies arrays and tags
- **UUID primary keys** with PostgreSQL's `gen_random_uuid()` function

## Component Architecture
- **Atomic design principles** with reusable UI components
- **Shadcn/ui configuration** using New York style with neutral color scheme
- **Responsive design** with mobile-first Tailwind classes
- **Accessibility-first** components using Radix UI primitives
- **Test-friendly** components with data-testid attributes throughout

## Content Management
- **Multi-entity CMS** supporting projects, testimonials, and blog posts
- **Category-based organization** for projects and blog content
- **Featured content system** for highlighting key items
- **SEO optimization** with React Helmet for meta tag management
- **Image handling** with external URL references (Unsplash integration)

## Form Handling & Validation
- **React Hook Form** with Zod schema validation
- **Drizzle-Zod integration** for consistent validation between frontend and backend
- **Contact form** with service selection, budget ranges, and timeline options
- **Quote request system** with structured data collection
- **Toast notifications** for user feedback on form submissions

## Development Workflow
- **TypeScript** across the entire stack for type safety
- **ESM modules** with modern import/export syntax
- **Path aliases** for clean imports (`@/`, `@shared/`)
- **Hot module replacement** in development with Vite
- **Build optimization** with separate client and server bundling

# External Dependencies

## Database & Hosting
- **Neon Database** - Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit** - Database migration management and schema updates

## UI & Styling
- **Radix UI** - Complete suite of accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Lucide React** - Consistent icon system throughout the application
- **Google Fonts** - Custom typography with DM Sans, Geist Mono, and other font families

## Development Tools
- **Vite** - Fast build tool with HMR and optimization
- **TypeScript** - Static type checking and enhanced developer experience
- **PostCSS** - CSS processing with Tailwind and Autoprefixer
- **ESBuild** - Fast JavaScript bundling for production builds

## Analytics & Monitoring
- **Google Analytics 4** - Web analytics with custom event tracking
- **Environment-based configuration** for development vs production tracking

## Form & Validation
- **React Hook Form** - Performant form handling with minimal re-renders
- **Zod** - Schema validation with TypeScript integration
- **Hookform Resolvers** - Integration between React Hook Form and Zod

## State Management
- **TanStack Query** - Server state management with caching and synchronization
- **React Context** - Client-side state for UI components and theming

## Development Environment
- **Replit Integration** - Development environment with runtime error handling
- **TSX** - TypeScript execution for development server
- **Connect-PG-Simple** - Session storage for PostgreSQL integration