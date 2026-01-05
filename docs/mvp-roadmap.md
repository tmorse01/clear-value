# MVP Development Roadmap

## Phase 1: Foundation (Weeks 1-2)

### Setup & Infrastructure

- [x] Monorepo structure (pnpm workspace)
- [x] TypeScript configuration
- [x] Basic API server
- [x] Basic React app
- [ ] Shared types package setup
- [ ] Development environment documentation
- [ ] Git workflow & branching strategy

### Core Types

- [ ] Define all TypeScript interfaces (see `data-models.md`)
- [ ] Create shared package exports
- [ ] Set up type validation (Zod schemas)

---

## Phase 2: Backend Core (Weeks 3-4)

### CSV Parser

- [ ] CSV upload endpoint
- [ ] Parse common MLS formats (NWMLS, Cloud CMA, RPR)
- [ ] Field mapping & normalization
- [ ] Validation & error handling
- [ ] Geocoding integration (optional for MVP)

### Regression Engine

- [ ] Linear regression implementation
- [ ] Feature engineering (GLA, beds, baths, lot, age, distance, time)
- [ ] Coefficient calculation
- [ ] Adjustment computation
- [ ] Outlier detection
- [ ] Confidence scoring
- [ ] Unit tests

### Report Generation

- [ ] Assemble report data structure
- [ ] Calculate similarity scores
- [ ] Generate chart data
- [ ] Value range calculation

---

## Phase 3: API Endpoints (Week 5)

### REST API

- [ ] POST `/api/v1/parser/csv` - Parse CSV
- [ ] POST `/api/v1/subject/validate` - Validate subject
- [ ] POST `/api/v1/report/generate` - Generate report
- [ ] POST `/api/v1/report/export-pdf` - Export PDF
- [ ] Error handling & validation
- [ ] API documentation (OpenAPI/Swagger)

### PDF Generation

- [ ] Choose PDF library
- [ ] Design report template
- [ ] Page 1: Valuation Summary
- [ ] Page 2: Comparable Table
- [ ] Page 3: Regression Adjustments
- [ ] Page 4: Charts
- [ ] Watermarking for free tier

---

## Phase 4: Frontend Core (Weeks 6-7)

### UI Components

- [ ] Subject property form
- [ ] CSV upload component
- [ ] Comp table display
- [ ] Report summary view
- [ ] Charts (Price vs GLA, Distribution, Trend)
- [ ] PDF download button
- [ ] Loading states
- [ ] Error handling UI

### State Management

- [ ] Form state management
- [ ] API integration (fetch/axios)
- [ ] Report data caching
- [ ] Error state handling

### Styling

- [ ] Design system / component library
- [ ] Responsive layout
- [ ] Print-friendly styles

---

## Phase 5: Integration & Polish (Week 8)

### End-to-End Flow

- [ ] Complete user journey testing
- [ ] Error scenarios
- [ ] Edge cases (too few comps, outliers, etc.)
- [ ] Performance optimization

### Free Tier Implementation

- [ ] Comp limit (5 comps)
- [ ] No PDF export
- [ ] Watermarked preview
- [ ] Basic value (no range)

### Documentation

- [ ] User guide
- [ ] CSV format examples
- [ ] API documentation
- [ ] Deployment guide

---

## Phase 6: Testing & Validation (Week 9)

### Testing

- [ ] Unit tests (regression engine, parsers)
- [ ] Integration tests (API endpoints)
- [ ] E2E tests (full report flow)
- [ ] Regression tests (known test cases)

### Validation

- [ ] Test with real Bellingham comps
- [ ] Validate against manual calculations
- [ ] Get feedback from 2-3 local agents
- [ ] Iterate based on feedback

---

## Phase 7: Launch Prep (Week 10)

### Deployment

- [ ] Production environment setup
- [ ] CI/CD pipeline
- [ ] Environment variables
- [ ] Monitoring & logging
- [ ] Error tracking

### Marketing Materials

- [ ] Landing page
- [ ] Demo report examples
- [ ] Pricing page
- [ ] Documentation site

### Launch Checklist

- [ ] All MVP features complete
- [ ] Free tier working
- [ ] PDF export working
- [ ] Error handling robust
- [ ] Performance acceptable
- [ ] Security review

---

## Success Metrics

### Technical

- Report generation: < 3 seconds
- PDF export: < 5 seconds
- 99% uptime
- Zero critical bugs

### Product

- Free tier users can generate reports
- Reports are mathematically sound
- PDFs are lender-ready format
- Users understand the output

### Business

- 10+ free tier users in first month
- 1+ paid conversion
- Positive feedback from test users

---

## Post-MVP (Future Phases)

### Phase 8: Paid Tier

- [ ] Payment integration (Stripe)
- [ ] User accounts
- [ ] Report history
- [ ] Full feature unlock

### Phase 9: Enhancements

- [ ] Ridge regression option
- [ ] More chart types
- [ ] Report templates
- [ ] Email delivery

### Phase 10: Scale

- [ ] Database integration
- [ ] User authentication
- [ ] Team accounts
- [ ] API rate limiting

---

## Technical Decisions (✅ Decided)

### ✅ Completed Decisions

- ✅ Backend framework: **Fastify**
- ✅ PDF generation: **Puppeteer + Handlebars** (or PDFKit)
- ✅ Chart library: **Material UI Charts** (Recharts fallback)
- ✅ Validation library: **Zod**
- ✅ Geocoding service: **Google Maps API**
- ✅ UI library: **Material UI**
- ✅ State management: **TanStack Query + React Context**
- ✅ Styling: **CSS Modules + MUI sx prop**
- ✅ Database: **PostgreSQL (Railway)**
- ✅ ORM: **Prisma**
- ✅ Hosting: **Railway**
- ✅ Testing: **Vitest** (unit/integration), **Playwright** (E2E post-MVP)
- ✅ Domain: **clearvalue.taylormorsedev.com** (temporary)
- ✅ Payment: **Stripe** (post-MVP)
- ✅ Auth: **Auth0** (post-MVP)

### Remaining Decisions

- [ ] Regression library (ml-matrix/simple-statistics/custom)
- [ ] PDF template approach (Handlebars vs PDFKit)
- [ ] Exact pricing ($25/$50 per report?)
- [ ] Free tier limits (5 comps? 1 report?)
- [ ] Report retention (how long to cache?)
- [ ] Logo and final branding assets

---

## Notes

- **Focus**: Do one thing well (regression-adjusted CMA)
- **Scope Creep**: Resist adding MLS integration, user accounts, etc. until post-MVP
- **Quality**: Reports must be mathematically defensible
- **Speed**: Fast iteration, get to users quickly
- **Feedback**: Early and often from real users
