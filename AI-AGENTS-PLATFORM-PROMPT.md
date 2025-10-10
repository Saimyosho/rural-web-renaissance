# Prompt for Claude: Build a Modular SaaS Platform of AI Agents

You are an expert software architect, cloud engineer, and AI developer. Your task is to design and scaffold a modular, multi-tenant SaaS platform targeted at small businesses in rural Pennsylvania. The client currently builds custom websites for free, then upsells AI-powered microservices. You must:

## 1. Understand the Business Context
- **Client**: Local web designer who gives away websites, then monetizes via add-on SaaS tools  
- **Target users**: Small service shops, retailers, event venues, trades, etc., in rural Pennsylvania  
- **Sales strategy**: Standalone agents or bundled "Growth Pack," 14-day free trial, Stripe billing

## 2. Define Eight AI Agents and Their Core Features

### 1. Appointment & Booking Agent
- Calendar sync (Google Calendar, Outlook, iCal)
- SMS/email reminders with customizable templates
- Smart rescheduling with conflict detection
- Customer self-service booking portal
- No-show tracking and automated follow-ups

### 2. Local SEO Optimizer Agent
- Automated site crawl and technical SEO audit
- Meta-tag fixes and structured data implementation
- Keyword research and suggestions for local search
- Sitemap generation and submission to search engines
- Monthly health report with actionable recommendations
- Local business listing sync (Google My Business, Bing Places)

### 3. Customer Support & FAQ Agent
- AI chatbot trained on business-specific service details
- Deflects routine questions (hours, pricing, services)
- Intelligent handoff to email/SMS for complex queries
- FAQ auto-update based on conversation patterns
- Multi-channel support (web widget, SMS, email)
- Sentiment analysis and escalation triggers

### 4. Feedback & Review Booster Agent
- Post-transaction review prompts via email/SMS
- Sentiment analysis on customer feedback
- 5-star review widget for website embedding
- Alerts on negative trends with response templates
- Review aggregation from multiple platforms
- Response automation for common feedback themes

### 5. Social Media Content Agent
- Auto-generate posts from website content and business updates
- Hashtag suggestions optimized for local reach
- Local tag targeting (location, community events)
- Basic analytics (engagement, reach, best posting times)
- Multi-platform scheduling (Facebook, Instagram, Twitter/X)
- Content calendar with approval workflow

### 6. Inventory & Order Manager Agent
- Real-time stock tracking across multiple locations
- Reorder alerts based on configurable thresholds
- E-commerce order notifications and fulfillment tracking
- Demand forecasting using historical data
- Lightweight dashboard with key metrics
- Supplier management and purchase order generation

### 7. Event & Promotion Planner Agent
- Publish event calendars with RSVP functionality
- Email/SMS reminders for upcoming events
- AI-assisted copy and design suggestions for flyers
- Attendance tracking and check-in tools
- Post-event survey distribution
- Promotional campaign scheduling and analytics

### 8. Employee Scheduling & Timesheet Agent
- Shift scheduling with availability management
- Clock-in/out reminders via SMS or mobile app
- Hours summary and overtime tracking
- Payroll export in standard formats (CSV, QuickBooks)
- PTO request and approval workflow
- Labor cost forecasting and budget alerts

## 3. Propose a Standardized Tech Stack & Architecture

### Backend (API Layer)
- **Framework**: Python FastAPI or Node.js Express
- **API Design**: RESTful CRUD endpoints with OpenAPI/Swagger docs
- **Authentication**: JWT-based API keys per tenant
- **Rate Limiting**: Redis-based throttling (100 req/min per tenant)

### AI/NLP
- **LLM Integration**: Hugging Face Inference API or self-hosted Transformers (Llama 3, Mistral)
- **Dialog Management**: Rasa Open Source or custom state machine
- **Vector Database**: Pinecone or Weaviate for semantic search
- **Fine-tuning**: Per-tenant model adaptation for domain-specific knowledge

### Data Storage
- **NoSQL**: DynamoDB (AWS) or Cosmos DB (Azure) for flexible agent state/config
- **Relational**: PostgreSQL for reporting, billing, and multi-tenant metadata
- **Caching**: Redis for session state, rate limits, and frequently accessed data
- **Object Storage**: S3 or Azure Blob for file uploads, exports, and backups

### Front-End Widget
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast builds
- **Distribution**: Scoped NPM package (`@brand/agent-widget`) and embeddable `<script>` tag
- **Styling**: Tailwind CSS with white-label theming support

### Containerization & Orchestration
- **Containers**: Docker images per agent (API + UI)
- **Registry**: Docker Hub (public) or Azure Container Registry (private)
- **Orchestration**: Kubernetes with Helm charts for cloud deployment
- **Self-Hosted**: Docker Compose for single-server deployments
- **Scaling**: Horizontal pod autoscaling based on CPU/memory

### CI/CD
- **Platform**: GitHub Actions or Azure DevOps
- **Pipeline Stages**: Lint → Test → Build → Security Scan → Push → Deploy
- **Testing**: Unit tests (Jest/Pytest), integration tests, E2E tests (Playwright)
- **Security**: Trivy for container scanning, Dependabot for dependency updates

### Observability
- **Logs**: Structured logging with JSON format, shipped to ELK or Azure Monitor
- **Metrics**: Prometheus + Grafana for performance monitoring
- **Tracing**: OpenTelemetry for distributed tracing
- **Alerts**: PagerDuty or Opsgenie for critical incidents

## 4. Provide a Project Skeleton for Each Agent

```
agent-<name>/
├── api/
│   ├── app.py                 # FastAPI app (or index.ts for Express)
│   ├── requirements.txt       # Python deps (or package.json for Node)
│   ├── routers/
│   │   ├── health.py          # Health check endpoint
│   │   ├── webhooks.py        # Webhook handlers
│   │   └── main.py            # Core business logic
│   ├── models/
│   │   ├── schemas.py         # Pydantic models
│   │   └── database.py        # DB connection/ORM
│   ├── services/
│   │   ├── ai_service.py      # LLM/NLP integration
│   │   ├── notification.py    # Email/SMS sender
│   │   └── analytics.py       # Usage tracking
│   ├── tests/
│   │   ├── test_api.py
│   │   └── test_services.py
│   └── Dockerfile
├── ui/
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── api/               # API client
│   │   └── styles/            # Tailwind config
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── Dockerfile
├── helm/
│   ├── Chart.yaml
│   ├── values.yaml            # Default config
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── configmap.yaml
├── infra/
│   ├── terraform/
│   │   ├── main.tf            # Core infrastructure
│   │   ├── variables.tf       # Input variables
│   │   ├── outputs.tf         # Output values
│   │   └── modules/
│   │       ├── database/
│   │       ├── cache/
│   │       └── storage/
│   └── terragrunt.hcl         # Multi-env config
├── .github/
│   └── workflows/
│       ├── ci.yml             # Build and test
│       ├── cd.yml             # Deploy to staging/prod
│       └── security.yml       # Dependency scanning
├── docs/
│   ├── API.md                 # API documentation
│   ├── SETUP.md               # Local dev setup
│   └── DEPLOY.md              # Deployment guide
├── README.md
├── LICENSE
└── .gitignore
```

## 5. Sample Dockerfiles

### API Dockerfile (Python FastAPI)
```dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Run application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "4"]
```

### UI Dockerfile (React + Vite)
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build application
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

## 6. Outline Distribution, Licensing & Billing

### Container Registry
- **Public**: Docker Hub for open-source components
- **Private**: Azure Container Registry or AWS ECR for proprietary agents
- **Versioning**: Semantic versioning (v1.2.3), latest tag for stable releases
- **Multi-arch**: Build for amd64 and arm64 architectures

### Widget Distribution
- **NPM Packages**: Scoped packages (e.g., `@ruralweb/booking-widget`)
- **CDN**: Unpkg or jsDelivr for `<script>` tag embedding
- **Versioning**: Follow semver, publish alpha/beta/rc tags for testing
- **Documentation**: Embedded Storybook for component demos

### Subscription Plans via Stripe
1. **Starter ($29/month)**
   - One agent of choice
   - Up to 100 actions/month
   - Basic analytics dashboard
   - Email support (48h response)

2. **Growth ($99/month)**
   - Up to three agents
   - Up to 1,000 actions/month
   - Advanced reporting and exports
   - Priority email support (24h response)
   - Custom branding (logo, colors)

3. **Enterprise ($299/month)**
   - Unlimited agents
   - Unlimited actions
   - White-label support (remove branding)
   - Dedicated account manager
   - SLA guarantees (99.9% uptime)
   - Phone support

### Onboarding Flow
1. **Sign-up**: Email verification, collect business details
2. **Trial**: 14-day free trial (no credit card required)
3. **Setup Wizard**: 
   - Connect data sources (Google Calendar, website, social accounts)
   - Configure agent settings (hours, services, FAQs)
   - Customize widget appearance
   - Generate API key
4. **Embed**: Copy/paste widget code into website
5. **Go Live**: Activate agents and start trial
6. **Conversion**: Prompt to add payment method before trial ends

## 7. Highlight Advanced Considerations

### White-Label Theming
- **Config File**: `theme.json` with logo URL, primary/secondary colors, fonts
- **CSS Variables**: Dynamic injection of theme variables
- **Build-Time**: Generate themed builds per customer for Enterprise tier

### Multi-Tenant Data Isolation
- **Schema-per-Tenant**: Separate PostgreSQL schemas for strong isolation
- **Row-Level Security**: Tenant ID column with RLS policies for shared tables
- **API Gateway**: Tenant routing based on subdomain or API key

### Offline Support
- **Service Worker**: Cache API responses and queue actions
- **Sync Queue**: Background sync when connection restored
- **Conflict Resolution**: Last-write-wins or custom merge strategies

### Central Analytics Dashboard
- **Metrics**: Agent usage, API calls, response times, error rates
- **Business KPIs**: Appointments booked, reviews collected, social engagement
- **ROI Calculator**: Compare agent cost vs. time/money saved
- **Exportable Reports**: PDF/CSV export for stakeholders

### Security & Compliance
- **Data Encryption**: TLS 1.3 in transit, AES-256 at rest
- **GDPR Compliance**: Data deletion APIs, consent management
- **SOC 2**: Audit logging, access controls, incident response plan
- **Penetration Testing**: Annual third-party security audits

## 8. Your Deliverables

### 1. Technical Specifications (per agent)
- Architecture diagram (components, data flow, integrations)
- API specification (OpenAPI YAML with all endpoints)
- Data models (database schemas, entity relationships)
- AI/ML workflows (model selection, training, inference)
- Third-party integrations (APIs, webhooks, auth flows)

### 2. Folder Structures and Sample Code
- Complete project skeleton for one reference agent (Booking Agent)
- Sample API endpoints (CRUD operations, webhooks)
- Sample React widget with embed code
- Database migration scripts
- Seed data for testing

### 3. Infrastructure as Code
- **Terraform Modules**:
  - VPC and networking
  - EKS/AKS cluster
  - RDS/Cosmos DB
  - S3/Blob storage
  - CloudFront/CDN
  - IAM roles and policies
- **Helm Charts**:
  - Deployment with resource limits
  - Service (ClusterIP, LoadBalancer)
  - Ingress with TLS
  - ConfigMap and Secrets
  - HorizontalPodAutoscaler

### 4. CI/CD Pipeline Definitions
- **GitHub Actions Workflow**:
  ```yaml
  name: CI/CD
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Run tests
          run: npm test
        - name: Build Docker image
          run: docker build -t agent:${{ github.sha }} .
        - name: Push to registry
          run: docker push agent:${{ github.sha }}
    deploy:
      needs: build
      if: github.ref == 'refs/heads/main'
      runs-on: ubuntu-latest
      steps:
        - name: Deploy to Kubernetes
          run: helm upgrade agent ./helm --set image.tag=${{ github.sha }}
  ```

### 5. Stripe Billing Integration
- **Products and Prices**: Code to create Stripe products/prices
- **Checkout Session**: API to initiate subscription checkout
- **Webhook Handler**: Process subscription events (created, updated, canceled)
- **Usage-Based Billing**: Meter API usage and report to Stripe
- **Customer Portal**: Stripe-hosted portal for plan management

### 6. Setup and Deployment Guide
- **Local Development**:
  - Prerequisites (Docker, Node, Python)
  - Clone repo and install dependencies
  - Run with Docker Compose
  - Access at http://localhost:3000
- **Production Deployment**:
  - Provision infrastructure with Terraform
  - Configure secrets (API keys, database credentials)
  - Deploy with Helm to Kubernetes
  - Set up monitoring and alerts
  - Configure custom domain and SSL
- **Troubleshooting**:
  - Common errors and solutions
  - Log inspection commands
  - Rollback procedures

---

## Output Format

Structure your response as comprehensive, ready-to-execute blueprints organized as follows:

1. **Executive Summary** (1-2 pages)
   - Platform overview
   - Key technical decisions
   - Timeline estimates

2. **Architecture Deep Dive** (per agent)
   - Component diagrams
   - Sequence diagrams
   - Data flow diagrams

3. **Code Examples** (generously commented)
   - API endpoint implementation
   - Database models
   - React widget component
   - AI service integration

4. **Infrastructure** (ready to apply)
   - Terraform configurations
   - Helm chart templates
   - Kubernetes manifests

5. **CI/CD** (copy-paste ready)
   - GitHub Actions workflows
   - Build scripts
   - Deployment scripts

6. **Documentation** (Markdown formatted)
   - API reference
   - Widget integration guide
   - Admin dashboard guide
   - Troubleshooting playbook

**Goal**: Enable the client's dev team to spin up each agent in under one day with minimal configuration.
