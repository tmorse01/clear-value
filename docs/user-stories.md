# User Stories

## Epic 1: Report Generation

### Story 1.1: Upload Comparable Properties

**As a** real estate agent  
**I want to** upload a CSV file with my comps  
**So that** I don't have to manually enter each property

**Acceptance Criteria:**

- User can upload CSV file via drag-and-drop or file picker
- System accepts common MLS export formats (NWMLS, Cloud CMA, RPR)
- System validates required fields (address, sale price, sale date, GLA, beds, baths, year built)
- System displays parsed comps in a table
- System shows warnings for missing optional fields
- System shows errors for invalid data

**Technical Notes:**

- Support multiple CSV column name variations
- Handle missing/empty cells gracefully
- Validate data types and ranges

---

### Story 1.2: Enter Subject Property

**As a** real estate agent  
**I want to** enter details about the property I'm valuing  
**So that** the system can calculate adjustments

**Acceptance Criteria:**

- Form includes: address, beds, baths, GLA, lot size, year built, property type
- Optional fields: condition, finish level, notes
- Form validates all inputs (ranges, types)
- Form shows clear error messages
- Address can be geocoded (optional for MVP)

**Technical Notes:**

- Use shared types for validation
- Real-time validation feedback
- Auto-calculate age from year built

---

### Story 1.3: Generate Regression-Adjusted Valuation

**As a** real estate agent  
**I want to** generate a regression-adjusted CMA report  
**So that** I get a statistically defensible value estimate

**Acceptance Criteria:**

- System requires minimum 3 comps
- System runs regression model on comps
- System calculates adjustments for each comp
- System provides estimated value with confidence range
- System assigns confidence grade (A-D)
- System identifies outliers
- Report generation completes in < 3 seconds

**Technical Notes:**

- Linear regression with features: GLA, beds, baths, lot, age, distance, time
- Calculate R-squared, standard error
- Confidence intervals using standard error

---

### Story 1.4: View Report Summary

**As a** real estate agent  
**I want to** see a summary of the valuation  
**So that** I can quickly understand the result

**Acceptance Criteria:**

- Display estimated value prominently
- Show value range (low-high)
- Display confidence grade with explanation
- Show number of comps used
- Display any warnings (outliers, insufficient comps, etc.)

**Technical Notes:**

- Clear visual hierarchy
- Color coding for confidence grades
- Tooltips explaining metrics

---

### Story 1.5: View Comparable Properties Table

**As a** real estate agent  
**I want to** see all comps with their adjustments  
**So that** I can verify the calculations

**Acceptance Criteria:**

- Table shows all comps with original data
- Table shows distance from subject
- Table shows similarity score
- Table shows individual adjustments (GLA, beds, baths, etc.)
- Table shows adjusted price
- Table shows residual (difference from predicted)
- Outliers are clearly marked
- Table is sortable and filterable

**Technical Notes:**

- Responsive table design
- Export to CSV option (future)

---

### Story 1.6: View Regression Details

**As a** construction lender  
**I want to** see the regression coefficients and statistics  
**So that** I can audit the mathematical model

**Acceptance Criteria:**

- Display all regression coefficients
- Show R-squared and adjusted R-squared
- Show standard error
- Explain what each coefficient means
- Show which features are statistically significant (if available)

**Technical Notes:**

- Clear mathematical presentation
- Professional formatting
- Exportable for documentation

---

### Story 1.7: View Charts

**As a** builder  
**I want to** see visualizations of the data  
**So that** I can understand market trends and relationships

**Acceptance Criteria:**

- Chart 1: Price vs GLA scatter plot with regression line
- Chart 2: Adjusted vs unadjusted price distribution
- Chart 3: Sale price trend over time
- Charts are interactive (hover for details)
- Charts are exportable as images

**Technical Notes:**

- Use charting library (Recharts/Chart.js)
- Responsive chart sizing
- Print-friendly versions

---

### Story 1.8: Export PDF Report

**As a** construction lender  
**I want to** export a PDF report  
**So that** I can include it in loan documentation

**Acceptance Criteria:**

- PDF includes all 4 pages (Summary, Comps, Regression, Charts)
- PDF is professionally formatted
- PDF includes metadata (generated date, model version)
- PDF is lender-ready (not a presentation)
- PDF download starts automatically
- Free tier shows watermarked preview only

**Technical Notes:**

- Multi-page PDF layout
- Consistent branding
- Print-optimized

---

## Epic 2: Free Tier Experience

### Story 2.1: Limited Comp Count

**As a** free tier user  
**I want to** use up to 5 comps  
**So that** I can test the tool before paying

**Acceptance Criteria:**

- System allows up to 5 comps for free tier
- System shows clear message when limit reached
- System suggests upgrading for more comps
- System still generates valid reports with 3-5 comps

---

### Story 2.2: Preview Without PDF Export

**As a** free tier user  
**I want to** see the full report on screen  
**So that** I can evaluate the tool's value

**Acceptance Criteria:**

- All report pages visible in browser
- PDF export button shows upgrade prompt
- Clear messaging about free vs paid features
- Watermarked preview available

---

### Story 2.3: Basic Value Estimate

**As a** free tier user  
**I want to** see the estimated value  
**So that** I can decide if the tool is useful

**Acceptance Criteria:**

- Estimated value displayed
- Value range not shown (paid feature)
- Confidence grade shown
- Clear indication of free tier limitations

---

## Epic 3: Data Validation & Error Handling

### Story 3.1: Validate CSV Format

**As a** user  
**I want to** get clear errors when my CSV is invalid  
**So that** I can fix the file and try again

**Acceptance Criteria:**

- System detects invalid CSV structure
- System shows which rows have errors
- System explains what's wrong
- System suggests fixes
- System allows re-upload

---

### Story 3.2: Handle Insufficient Comps

**As a** user  
**I want to** know when I don't have enough comps  
**So that** I can add more or understand the limitation

**Acceptance Criteria:**

- System requires minimum 3 comps
- Clear error message if < 3 comps
- Suggestion to add more comps
- Explanation of why 3+ comps are needed

---

### Story 3.3: Handle Outliers

**As a** user  
**I want to** know when comps are outliers  
**So that** I can decide whether to include them

**Acceptance Criteria:**

- System identifies outliers using residual analysis
- Outliers are marked in the comp table
- System explains why a comp is an outlier
- User can see report with or without outliers
- System warns if removing outliers leaves < 3 comps

---

## Epic 4: User Experience

### Story 4.1: Clear Progress Indicators

**As a** user  
**I want to** see progress during report generation  
**So that** I know the system is working

**Acceptance Criteria:**

- Loading spinner during CSV parsing
- Progress indicator during regression calculation
- Progress indicator during PDF generation
- Estimated time remaining (if > 2 seconds)

---

### Story 4.2: Helpful Error Messages

**As a** user  
**I want to** understand what went wrong  
**So that** I can fix the issue

**Acceptance Criteria:**

- Error messages are in plain language
- Error messages suggest solutions
- Error messages include relevant field names
- Error messages are actionable

---

### Story 4.3: Responsive Design

**As a** user  
**I want to** use the tool on my tablet or phone  
**So that** I can work from anywhere

**Acceptance Criteria:**

- Layout adapts to screen size
- Forms are usable on mobile
- Tables are scrollable on small screens
- Charts are readable on all devices

---

## Future Stories (Post-MVP)

### Story 5.1: Save Reports

**As a** pro user  
**I want to** save my reports  
**So that** I can access them later

### Story 5.2: Compare Scenarios

**As a** builder  
**I want to** compare as-is vs as-complete valuations  
**So that** I can understand construction value

### Story 5.3: MLS Integration

**As a** real estate agent  
**I want to** import comps directly from MLS  
**So that** I don't have to export CSV files

### Story 5.4: Team Accounts

**As a** brokerage owner  
**I want to** manage team member access  
**So that** my agents can use the tool

### Story 5.5: Custom Branding

**As a** enterprise user  
**I want to** add my logo to reports  
**So that** reports match my brand
