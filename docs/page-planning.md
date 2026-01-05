# Page Planning & User Flow Documentation

## Overview

This document outlines the structure, purpose, and user interactions for all pages in the CompClear application. The application follows a three-page workflow: a marketing landing page, a stepped form for data entry, and a powerful dashboard page for analysis and visualization.

---

## Page Structure

### 1. Landing Page (`/`)

**File:** `apps/web/src/pages/HomePage.tsx`

#### Purpose

The landing page serves as the marketing and feature showcase entry point. It introduces users to the application, explains key features and benefits, and provides a clear call-to-action to start creating reports.

#### User Actions

**Primary Action: Create Report**

- **Action:** Click "Create Report" or "Get Started" button
  - Navigates to `/create` (stepped form page)
  - Clears any previous report data (optional)

**Secondary Actions:**

- **Scroll:** Explore features and benefits
- **Learn More:** Click on feature cards for details
- **View Examples:** See sample reports or use cases (future)

#### Visual Elements

- **Hero Section:**
  - Headline and value proposition
  - Primary CTA button ("Create Report")
  - Optional hero image or illustration
- **Features Section:**
  - Key features with icons/illustrations
  - Benefits highlighted
  - Use cases explained
- **How It Works Section:**
  - Step-by-step process overview
  - Visual flow diagram
- **Testimonials/Social Proof:** (future)
  - User testimonials
  - Case studies
- **Footer:**
  - Additional links
  - Contact information

#### Navigation

- **Primary:** Click "Create Report" → Navigate to `/create`
- **Secondary:** Scroll to learn more about features

---

### 2. Create Report Page (`/create`)

**File:** `apps/web/src/pages/CreateReportPage.tsx`

#### Purpose

The create report page guides users through a three-step process to collect all necessary information before generating a regression-adjusted valuation report. This is where users input their data.

#### User Actions

**Step 1: Upload Comparables**

- **Action:** Upload CSV file with comparable property data
  - Drag and drop CSV file onto upload area
  - Click to browse and select CSV file
  - **OR** Click "Load Test Data" button to instantly load 14 example comparables
- **Validation:**
  - File must be CSV format
  - Must contain required columns (address, sale price, sale date, square feet, etc.)
  - Minimum 3 comparables required (warning shown if less)
- **Feedback:**
  - Success message showing count of loaded comparables
  - Error messages for invalid files or parsing failures
  - Warnings for missing or invalid data in rows
- **State Management:**
  - Updates `ReportContext` with loaded comparables
  - Auto-advances to Step 2 when comparables are loaded

**Step 2: Enter Subject Property**

- **Action:** Fill out subject property form
  - Enter property address (required)
  - Enter square feet/GLA (required)
  - Enter bedrooms (required)
  - Enter bathrooms (required)
  - Enter year built (required)
  - Enter lot size in acres (optional)
  - Select property type (optional)
  - Select condition (optional)
  - Add notes (optional)
- **Validation:**
  - Real-time field validation
  - Server-side validation on submit
  - Address geocoding (if coordinates not provided)
- **Feedback:**
  - Field-level error messages
  - Success indicator when subject property is saved
  - Loading state during validation
- **State Management:**
  - Updates `ReportContext` with subject property
  - Auto-advances to Step 3 when subject is saved

**Step 3: Generate Report**

- **Action:** Trigger report generation
  - Click "Generate Report" button
  - Button disabled until:
    - At least 3 comparables loaded
    - Subject property entered and validated
    - Not currently loading
- **Process:**
  - Shows loading spinner during generation
  - Calls API to generate regression analysis
  - Navigates to dashboard page on success
- **Error Handling:**
  - Displays error message if generation fails
  - Allows retry after fixing issues
- **State Management:**
  - Stores generated report in `ReportContext`
  - Navigates to `/report/{reportId}`

#### Visual Elements

- **Stepper Component:** Shows current step and progress
- **Card Layout:** Each step in its own card for clarity
- **Alert Messages:** Contextual feedback for each step
- **Loading States:** Full-screen spinner during report generation
- **Back Navigation:** Option to return to landing page

#### Navigation

- **On Success:** Automatically navigates to `/report/{reportId}`
- **On Error:** Stays on page, shows error, allows retry
- **Back to Landing:** "Back" or "Cancel" button to return to `/`

---

### 3. Dashboard Page (`/report/:reportId?`)

**File:** `apps/web/src/pages/ReportPage.tsx`

#### Purpose

The dashboard page is the main analysis and visualization interface. It displays the generated regression report with interactive charts, tables, and controls. This is where users explore the valuation analysis, adjust parameters, and export results.

#### Layout Structure

**Header Bar (Top)**

- **Left Side:**
  - "New Analysis" button (navigates back to landing page)
  - Page title: "Valuation Dashboard"
- **Right Side:**
  - PDF Export button (downloads report as PDF)

**Split Layout**

**Left Sidebar (400px on desktop, hidden on mobile)**

- **Purpose:** Persistent controls and filters
- **Components:**
  - Subject Property Form (compact version)
  - Filter Panel
  - Quick Filter Presets
  - Timeline Scrubber

**Main Dashboard Area (Flexible width)**

- **Purpose:** Data visualization and analysis
- **Components:**
  - KPI Tiles
  - Insight Callouts
  - View Mode Toggle
  - Content based on selected view mode

#### User Actions

**Subject Property Editing (Sidebar)**

- **Action:** Modify subject property details
  - Edit address, square feet, bedrooms, bathrooms, year built, etc.
  - Enable manual coordinate input (latitude/longitude)
  - Click "Open Map" (future: opens map picker)
  - Click "Save" to update subject property
- **Impact:**
  - Updates report calculations in real-time
  - Recalculates valuation estimate
  - Updates all charts and visualizations

**Filtering (Sidebar)**

- **Action:** Filter comparable properties
  - Adjust filters for:
    - Price range
    - Square feet range
    - Sale date range
    - Distance from subject
    - Property type
    - Condition
  - Use quick filter presets (e.g., "Last 6 months", "Within 1 mile")
  - Click "Reset" to clear all filters
- **Impact:**
  - Filters the comparables table
  - Updates regression analysis with filtered set
  - Recalculates valuation estimate
  - Updates all charts

**Timeline Scrubber (Sidebar)**

- **Action:** Adjust time-based analysis
  - Scrub through sale dates
  - Focus on specific time periods
- **Impact:**
  - Filters comparables by sale date
  - Updates trend charts
  - Adjusts time-based adjustments

**View Mode Toggle (Main Area)**

- **Action:** Switch between view modes
  - **Overview:** Key charts and summary visualizations
  - **Analysis:** Detailed regression analysis and coefficients
  - **Table:** Full comparables table with adjustments
- **Impact:**
  - Changes main content area display
  - Maintains sidebar and header

**KPI Interaction (Main Area)**

- **Action:** View key performance indicators
  - Estimated Value (with range)
  - Median Price per Square Foot
  - Comparables Count
  - Confidence Score
- **Details:**
  - Click for more details (future: tooltips or modals)
  - Color-coded by confidence level

**Chart Interaction (Main Area)**

- **Action:** Explore data visualizations
  - **Price vs. GLA Chart:** Scatter plot with regression line
    - Hover for property details
    - Click to highlight in table
  - **Price Distribution Chart:** Histogram of sale prices
    - Shows distribution of comparable sales
  - **Sale Price Trend Chart:** Line chart over time
    - Shows market trends
    - Highlights subject property estimate
- **Features:**
  - Interactive tooltips
  - Zoom and pan (future)
  - Export chart images (future)

**Table Interaction (Table View Mode)**

- **Action:** Explore comparable properties
  - Sort by columns
  - Filter inline
  - Highlight outliers
  - View adjustment details
  - Export table data (future)

**PDF Export (Header)**

- **Action:** Download report as PDF
  - Click PDF export button
  - Shows loading state during generation
  - Downloads PDF file
- **Content:**
  - All KPI tiles
  - All charts
  - Comparables table
  - Regression details
  - Subject property summary

#### Visual Elements

**KPI Tiles**

- Four key metrics displayed prominently
- Color-coded confidence indicators
- Large, readable numbers
- Contextual labels

**Insight Callouts**

- Warnings for low confidence scores
- Alerts for outlier properties
- Recommendations for data quality
- Market trend insights

**Charts**

- Responsive, interactive visualizations
- Consistent color scheme
- Clear labels and legends
- Accessible tooltips

**Tables**

- Sortable columns
- Highlighted outliers
- Adjustment details
- Responsive design

#### State Management

- **Report Data:** Stored in `ReportContext`
- **Filters:** Local state in filter components
- **View Mode:** Local state in `DashboardLayout`
- **Subject Property Updates:** Updates context, triggers recalculation

#### Navigation

- **Back to Landing:** "New Analysis" button in header
- **Direct URL Access:** Can navigate directly to `/report/{reportId}` if report exists in context
- **Empty State:** Shows message if no report available, prompts to go home

---

### 4. Not Found Page (`*`)

**File:** `apps/web/src/pages/NotFoundPage.tsx`

#### Purpose

Handles 404 errors and invalid routes. Provides a helpful message and navigation back to the application.

#### User Actions

- **Action:** Navigate back to application
  - Click "Go Home" button
  - Returns to landing page (`/`)

#### Visual Elements

- Error message
- 404 indicator
- Navigation button

---

## User Flow

### Primary Flow: New Analysis

```
1. User lands on Landing Page (/)
   - Reads features and benefits
   - Understands value proposition
   ↓
2. Click "Create Report" button
   - Navigates to /create
   ↓
3. Step 1: Upload Comparables
   - Option A: Upload CSV file
   - Option B: Click "Load Test Data"
   ↓
4. Step 2: Enter Subject Property
   - Fill out form
   - Validate and save
   ↓
5. Step 3: Generate Report
   - Click "Generate Report"
   - Wait for analysis
   ↓
6. Navigate to Dashboard (/report/{reportId})
   ↓
7. Explore Dashboard
   - View KPIs
   - Switch view modes
   - Adjust filters
   - Edit subject property
   - Export PDF
   ↓
8. Start New Analysis (optional)
   - Click "New Analysis"
   - Returns to Landing Page (/)
```

### Secondary Flow: Returning User

```
1. User navigates directly to /report/{reportId}
   ↓
2. Check if report exists in context
   ↓
3a. If exists: Display dashboard
3b. If not: Show empty state, prompt to go home
```

### Error Flow

```
1. User encounters error at any step
   ↓
2. Error message displayed
   ↓
3. User can:
   - Fix the issue and retry
   - Navigate back to previous step
   - Start over (clear all data)
```

---

## Component Hierarchy

### Landing Page Components

```
HomePage
├── Hero Section
│   ├── Headline
│   ├── Value Proposition
│   └── CTA Button ("Create Report")
├── Features Section
│   ├── Feature Cards
│   └── Icons/Illustrations
├── How It Works Section
│   └── Process Overview
└── Footer
```

### Create Report Page Components

```
CreateReportPage
├── Stepper (MUI)
├── CSVUpload
│   ├── File Upload Area
│   └── Load Test Data Button
├── SubjectPropertyForm
│   ├── Text Fields
│   ├── Select Dropdowns
│   └── Validation Messages
├── Generate Report Button
└── Back Navigation
```

### Dashboard Page Components

```
ReportPage
├── AppBar (Header)
│   ├── New Analysis Button
│   ├── Title
│   └── PDF Export Button
├── ControlsPanel (Sidebar)
│   ├── SubjectPropertyFormCompact
│   ├── FilterPanel
│   ├── FilterPresets
│   └── TimelineScrubber
└── DashboardLayout (Main Area)
    ├── KPITiles
    ├── InsightCallout
    ├── ViewModeToggle
    └── Content (based on view mode)
        ├── Overview: Charts Grid
        ├── Analysis: Regression Details
        └── Table: Comparables Table
```

---

## State Management

### ReportContext

- **Subject Property:** Current subject property data
- **Comparables:** Array of comparable properties
- **Report:** Generated report data
- **Loading:** Loading state for async operations
- **Error:** Error messages
- **Config:** Regression configuration

### Local State

- **Active Step:** Current step in landing page stepper
- **View Mode:** Selected view mode in dashboard
- **Filters:** Active filter values
- **Form Data:** Temporary form data before submission

---

## Responsive Design

### Desktop (> 960px)

- Full sidebar visible (400px)
- All charts and tables visible
- Optimal spacing and layout

### Tablet (600px - 960px)

- Sidebar hidden (can be toggled)
- Charts stack vertically
- Tables scroll horizontally

### Mobile (< 600px)

- Sidebar completely hidden
- Single column layout
- Simplified navigation
- Touch-optimized controls

---

## Future Enhancements

### Landing Page

- [ ] Save/load previous analyses
- [ ] Import from MLS systems
- [ ] Batch processing
- [ ] Template management

### Dashboard Page

- [ ] Real-time collaboration
- [ ] Comparison mode (multiple reports)
- [ ] Advanced filtering UI
- [ ] Map visualization
- [ ] Custom chart types
- [ ] Report templates
- [ ] Email sharing
- [ ] Version history

---

## Accessibility Considerations

### Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order follows visual flow
- Focus indicators visible

### Screen Readers

- ARIA labels on all interactive elements
- Descriptive alt text for charts
- Status announcements for state changes

### Visual Accessibility

- High contrast mode support
- Color-blind friendly color schemes
- Resizable text
- Clear focus indicators

---

## Performance Considerations

### Landing Page

- Lazy load form components
- Optimize CSV parsing
- Debounce validation

### Dashboard Page

- Virtualize large tables
- Lazy load charts
- Memoize expensive calculations
- Optimize re-renders with React.memo

---

## Testing Scenarios

### Landing Page

1. View hero section
2. Scroll through features
3. Click "Create Report" button
4. Navigate to create page

### Create Report Page

1. Upload valid CSV file
2. Upload invalid CSV file
3. Load test data
4. Fill subject property form
5. Generate report with valid data
6. Generate report with invalid data
7. Navigate between steps
8. Navigate back to landing page

### Dashboard Page

1. View all KPIs
2. Switch view modes
3. Apply filters
4. Edit subject property
5. Export PDF
6. Navigate back to landing
7. Handle empty state
8. Handle loading state

---

## Conclusion

The application follows a clear three-page workflow:

1. **Landing Page:** Marketing and feature showcase with clear call-to-action
2. **Create Report Page:** Data collection through stepped form
3. **Dashboard Page:** Analysis and visualization with interactive controls

This structure provides a professional user experience that:

- Introduces users to the application's value proposition
- Guides them through data entry with a clear stepped process
- Provides a powerful dashboard for analysis and exploration

The separation of landing and creation pages allows for better marketing and onboarding, while the persistent sidebar and main content area create a powerful dashboard interface that matches the regression demo's design philosophy.
