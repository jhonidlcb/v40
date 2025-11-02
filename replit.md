# Overview

SoftwarePar is a comprehensive software development project management platform built for the Paraguayan market. It serves as a multi-role SaaS application connecting three types of users: administrators, clients, and partners (affiliates). The platform manages the complete software development lifecycle including project creation, budget negotiation, payment tracking, support ticketing, and partner referrals with commission management.

The application emphasizes localization for Paraguay with integrated support for electronic invoicing (SIFEN), multi-currency handling (USD/Guaraní), and geo-specific SEO optimization.

# Recent Changes

## Optimización para Google AI Overview - Tono Comercial (October 29, 2025)

Implementadas mejoras completas de SEO y contenido optimizado específicamente para Google AI Overview (Gemini) con tono profesional, inspirador y enfocado en confianza y resultados. El objetivo es que la IA de Google describa a SoftwarePar de forma clara, atractiva y comercial cuando se busque "SoftwarePar" o "SoftwarePar.lat".

**Optimizaciones Implementadas:**

**1. Meta Tags Mejorados (client/index.html):**
- Title actualizado: "SoftwarePar | Empresa Líder en Desarrollo de Software en Paraguay"
- Description optimizada enfatizando: empresa líder, 50+ proyectos, soporte 24/7
- Keywords agregadas: "SoftwarePar", "SoftwarePar.lat", "empresa tecnología Paraguay"
- Meta tags de fecha agregados para contenido fresco (2025-10-27)
- Canonical URL actualizado a https://softwarepar.lat
- Open Graph y Twitter Cards optimizados con mensajes de marca

**2. Schema.org Completo para AI:**
- **Organization Schema**: Con foundingDate (2020), slogan, knowsAbout (tecnologías), aggregateRating (4.9/5), contactPoint 24/7
- **LocalBusiness Schema**: Mejorado con horario de atención 24/7
- **FAQPage Schema**: 6 preguntas clave sobre SoftwarePar optimizadas para AI Overview
- Todos los schemas con descripciones largas y completas (70+ palabras)

**3. Contenido Optimizado para AI (client/src/pages/Landing.tsx):**
- **Hero Section**: Título actualizado a "SoftwarePar: Tu Partner Tecnológico en Paraguay"
- **Subtítulo mejorado**: Enfatiza empresa líder, 50+ proyectos, soporte 24/7, transformación digital
- **Sección TL;DR**: Box destacado después del hero respondiendo "¿Qué es SoftwarePar?" con 60 palabras clave
- **Sección FAQ**: 6 preguntas frecuentes con respuestas completas sobre SoftwarePar
  - ¿Qué es SoftwarePar?
  - ¿Qué servicios ofrece SoftwarePar?
  - ¿Dónde está ubicada SoftwarePar?
  - ¿SoftwarePar ofrece soporte técnico?
  - ¿Cuántos proyectos ha completado SoftwarePar?
  - ¿SoftwarePar implementa facturación electrónica SIFEN?

**4. Mejores Prácticas AI Overview Aplicadas:**
- Respuestas directas y conversacionales (50-70 palabras)
- Estructura clara con encabezados en formato pregunta
- Contenido E-E-A-T (Experiencia, Expertise, Autoridad, Confianza)
- Datos específicos: fundación 2020, 50+ proyectos, 98% satisfacción
- Información de contacto completa y disponibilidad 24/7
- Lenguaje natural optimizado para búsquedas conversacionales

**Resultados Esperados:**
Cuando alguien busque "SoftwarePar" o "SoftwarePar.lat" en Google, el AI Overview debería describir:
- SoftwarePar como empresa paraguaya líder en desarrollo de software
- Más de 50 proyectos completados exitosamente
- Especialistas en apps web, móviles y facturación electrónica SIFEN
- Soporte técnico 24/7 y transformación digital
- Fundada en 2020 con presencia en todo Paraguay

## Fresh GitHub Import - Replit Environment Setup (October 27, 2025)

Successfully imported and configured the project as a fresh clone from GitHub for the Replit environment:

**Setup Completed:**
- Installed all npm dependencies (745 packages)
- Configured workflow "Server" running on port 5000 with `npm run dev`
- Verified PostgreSQL database connection (using Replit's built-in database)
- Database schema confirmed with 24 tables (users, projects, partners, invoices, etc.)
- Frontend and backend both running successfully on port 5000
- Vite dev server configured with `allowedHosts: true` for Replit proxy support (line 37 in vite.config.ts)
- WebSocket server ready for real-time notifications on ws://0.0.0.0:5000/ws
- Landing page loads correctly with Paraguay-specific SEO content
- Admin user exists: softwarepar.lat@gmail.com
- Work modalities preloaded in database

**Deployment Configuration:**
- Target: VM (always running, suitable for stateful application with WebSocket)
- Build: `npm run build`
- Run: `npm start`
- Port: 5000 (frontend and backend on same port)

**Environment Variables:**
- DATABASE_URL: ✅ Configured (Replit built-in PostgreSQL)
- GMAIL_USER: ✅ Configured (softwarepar.noreply@gmail.com)
- GMAIL_PASS: ✅ Configured
- JWT_SECRET: ⚠️ Using generated fallback (should be set for production)

**Application Status:**
- Server running on http://0.0.0.0:5000
- Frontend properly configured for Replit proxy (allowedHosts: true in vite.config.ts)
- Database populated with existing users, work modalities, and portfolio items
- Landing page displaying correctly with SEO-optimized content
- API endpoints responding correctly (work-modalities, portfolio, company-info)
- Vite HMR (Hot Module Replacement) working in development mode
- Browser console shows successful Vite connection and work modalities loaded

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with shadcn/ui component library
- Framer Motion for animations
- WebSocket for real-time notifications

**Backend:**
- Express.js with TypeScript
- Node.js runtime
- RESTful API architecture
- WebSocket server for real-time features
- JWT-based authentication with bcrypt password hashing

**Database:**
- PostgreSQL (via Neon serverless)
- Drizzle ORM for type-safe database operations
- Schema-first approach with migrations in `/migrations` directory

## Project Structure

The codebase follows a monorepo structure:
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Shared TypeScript types and database schema
- `/backup_seo_20251019_152707` - Backup of previous version

## Core Architectural Decisions

### Authentication & Authorization

**Approach:** JWT token-based authentication with role-based access control (RBAC)

**Implementation:**
- Tokens stored in localStorage with 7-day expiration
- Three user roles: admin, client, partner
- Middleware (`authenticateToken`) validates tokens on protected routes
- Password reset functionality using time-limited tokens

**Rationale:** JWT provides stateless authentication suitable for REST APIs while localStorage enables persistent sessions across browser sessions.

### Database Design

**Approach:** Relational database with Drizzle ORM

**Key Tables:**
- `users` - Core user authentication and profile data
- `projects` - Software development projects with status tracking
- `partners` - Affiliate partner information with commission rates
- `referrals` - Partner referral tracking
- `tickets` - Support ticket system
- `portfolio` - Public portfolio items
- `invoices` - Billing and invoice management
- `paymentStages` - Project milestone-based payments
- `budgetNegotiations` - Client-admin budget negotiation flow
- `exchangeRateConfig` - Currency conversion rates (USD/Guaraní)
- `legalPages` - CMS for terms/privacy/cookies pages

**Design Patterns:**
- Soft deletes via `isActive` boolean flags
- Timestamp tracking with `createdAt`/`updatedAt`
- Foreign key relationships for data integrity
- JSONB fields for flexible metadata storage

### Real-time Communication

**Approach:** WebSocket connections for bidirectional real-time updates

**Features:**
- User-specific notification delivery
- Project message updates
- Connection management with automatic reconnection
- Heartbeat mechanism to maintain connections

**Rationale:** WebSockets provide low-latency push notifications essential for collaborative project management.

### Payment System

**Approach:** Multi-stage milestone-based payment system

**Key Components:**
- Configurable payment stages per project
- Multiple payment methods (bank transfer, MercadoPago, crypto)
- Payment proof upload and admin verification
- Currency conversion (USD ↔ Guaraní) with admin-configurable rates

**Workflow:**
1. Admin creates payment stages with progress requirements
2. Client uploads payment proof when stage is available
3. Admin verifies and confirms payment
4. Project progress unlocks next stage

### File Management

**Approach:** Server-side file storage with Multer middleware

**Storage:**
- Project files stored in `/uploads/projects/`
- Payment proofs in `/uploads/payment-proofs/`
- Portfolio images in `/uploads/portfolio/`
- File metadata tracked in database

**Security:** File type validation, size limits, and authenticated access only.

### Budget Negotiation System

**Approach:** Structured negotiation workflow between client and admin

**States:**
- pending → admin proposes price
- client_reviewing → client can accept/reject/counter
- accepted → project moves to active
- rejected → negotiation ends

**Rationale:** Formalizes pricing discussions and maintains audit trail.

## External Dependencies

### Third-Party Services

**Neon Database:**
- Serverless PostgreSQL hosting
- Connection via `@neondatabase/serverless` package
- Environment variable: `DATABASE_URL`

**Email Service (Gmail SMTP):**
- Nodemailer for transactional emails
- Welcome emails, password resets, notifications
- Environment variables: `GMAIL_USER`, `GMAIL_PASS`
- Optional in development, required in production

**reCAPTCHA v3:**
- Bot protection on contact forms and registration
- Site key: `VITE_RECAPTCHA_SITE_KEY`
- Server validation: `RECAPTCHA_SECRET_KEY`

**SIFEN (Paraguay Electronic Invoicing):**
- Integration prepared in `/server/sifen.ts`
- Digital signature support with node-forge
- XML generation and validation
- Currently prepared for future implementation

### Frontend Libraries

**UI Components:**
- Radix UI primitives for accessible components
- shadcn/ui component patterns
- Tailwind CSS for styling with CSS variables theming

**State Management:**
- TanStack Query for server state (10min stale time, optimistic updates)
- React hooks for local state
- Custom hooks pattern (`useAuth`, `useWebSocket`, `useProjects`)

**Form Handling:**
- React Hook Form with Zod validation
- `@hookform/resolvers` for schema integration

### Development Tools

**Build & Dev Server:**
- Vite with React plugin
- HMR disabled to prevent conflicts with Replit
- ESBuild for production bundling
- TypeScript compilation with strict mode

**Code Quality:**
- TypeScript for type safety
- Path aliases (`@/`, `@shared/`) for clean imports
- ESM modules throughout

### SEO & Analytics

**Recent Changes (October 19, 2025):**
Complete SEO optimization for Google Paraguay targeting was implemented with the following improvements:

**Meta Tags (client/index.html):**
- Title: "SoftwarePar - Desarrollo de Software y Facturación Electrónica en Paraguay"
- Description: Optimized with keywords including "desarrollo de software", "facturación electrónica SIFEN", "mantenimiento web"
- Keywords: desarrollo de software Paraguay, facturación electrónica SIFEN, apps móviles Paraguay, mantenimiento web Paraguay, hosting Paraguay
- Open Graph and Twitter Card meta tags for social sharing
- Geographic meta tags: geo.region=PY-10 (Itapúa), geo.placename=Encarnación, geo.position coordinates
- Language and locale: es-PY (Spanish - Paraguay)

**Schema.org Structured Data:**
- LocalBusiness schema with complete business information (address, phone, email, geo coordinates)
- Dedicated Service schema entity with Paraguay-focused service offerings
- Nested OfferCatalog with categories: Desarrollo Web, Facturación Electrónica, Apps Móviles, Mantenimiento Web
- All schemas properly linked and validated

**Content Optimization (client/src/pages/Landing.tsx):**
- H1 optimized with primary keywords: "Desarrollo de Software a Medida en Paraguay - Aplicaciones Web, Móviles y Facturación Electrónica SIFEN"
- All H2 headers updated with geo-specific keywords
- Service titles include "Paraguay" for local SEO
- Target keywords naturally integrated:
  - "desarrollo de software Paraguay"
  - "facturación electrónica SIFEN"
  - "mantenimiento web Paraguay"
  - "apps móviles Paraguay"
  - "hosting Paraguay"

**Image Optimization:**
- All images have descriptive alt tags with relevant keywords
- Lazy loading implemented on all portfolio and service images
- Alt tags format: "[Title] - [Category] desarrollado en Paraguay por SoftwarePar"

**Performance Optimization:**
- Preconnect and DNS prefetch for external resources (Google Fonts, Google Tag Manager)
- Font preloading for faster rendering
- Lazy loading for images below the fold
- Optimized CSS delivery

**Technical SEO:**
- robots.txt (client/public/robots.txt): Allows all crawlers, sitemap reference
- Dynamic sitemap.xml endpoint (GET /sitemap.xml in server/routes.ts):
  - Includes all static pages (home, términos, privacidad, cookies)
  - Dynamically adds active portfolio items from database
  - Updates daily with current timestamps
  - Proper XML format with changefreq and priority tags

**Internationalization Prep:**
- I18n context structure prepared
- Multi-language support framework
- Currency formatting utilities