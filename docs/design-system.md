# Design System

## Overview

CompClear uses Material UI as the foundation with a custom design system focused on **clean, trusted, professional** aesthetics. The default primary blue conveys trust and professionalism appropriate for real estate and lending contexts.

## Color Palette

### Primary Colors

```typescript
const primary = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3", // Default primary blue
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
};
```

**Usage**:

- Primary actions (buttons, links)
- Key metrics and highlights
- Brand elements

### Secondary Colors

```typescript
const secondary = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
};
```

**Usage**:

- Secondary actions
- Accent elements

### Semantic Colors

```typescript
const semantic = {
  success: "#4caf50", // Green for positive values, confidence
  warning: "#ff9800", // Orange for warnings, medium confidence
  error: "#f44336", // Red for errors, low confidence
  info: "#2196f3", // Blue for informational messages
};
```

### Neutral Colors

```typescript
const neutral = {
  white: "#ffffff",
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#eeeeee",
  gray300: "#e0e0e0",
  gray400: "#bdbdbd",
  gray500: "#9e9e9e",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
  black: "#000000",
};
```

## Typography

### Font Stack

```typescript
const typography = {
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
};
```

### Type Scale

- **H1**: 2.5rem (40px) - Page titles
- **H2**: 2rem (32px) - Section headers
- **H3**: 1.75rem (28px) - Subsection headers
- **H4**: 1.5rem (24px) - Card titles
- **H5**: 1.25rem (20px) - Small headers
- **H6**: 1rem (16px) - Labels
- **Body1**: 1rem (16px) - Default body text
- **Body2**: 0.875rem (14px) - Secondary text
- **Caption**: 0.75rem (12px) - Captions, metadata

## Spacing

Material UI's default 8px spacing system:

```typescript
const spacing = {
  unit: 8, // Base unit
  // Usage: spacing(1) = 8px, spacing(2) = 16px, etc.
};
```

## Components

### Buttons

**Primary Button**:

- Background: Primary blue (#2196f3)
- Text: White
- Use for: Main actions (Generate Report, Export PDF)

**Secondary Button**:

- Background: Transparent
- Border: Primary blue
- Text: Primary blue
- Use for: Secondary actions

**Text Button**:

- Background: Transparent
- Text: Primary blue
- Use for: Tertiary actions, links

### Cards

- Elevation: 2-4 (subtle shadow)
- Border radius: 8px
- Padding: 24px
- Background: White
- Use for: Report sections, comp tables, summary boxes

### Forms

- Input fields: Outlined style
- Label: Above input
- Error states: Red text + red border
- Helper text: Gray, 12px
- Spacing: 16px between fields

### Tables

- Header: Gray background (#f5f5f5)
- Row hover: Light blue (#e3f2fd)
- Borders: Light gray (#e0e0e0)
- Alternating rows: Optional subtle background
- Typography: Body2 for data, Body1 for headers

### Charts

- Primary color: Primary blue
- Grid lines: Light gray (#e0e0e0)
- Data points: Primary blue with white center
- Regression line: Primary blue, 2px width
- Background: White

## Confidence Grades

Visual representation of confidence scores:

- **Grade A** (0.85-1.0): Green (#4caf50) - High confidence
- **Grade B** (0.70-0.84): Blue (#2196f3) - Good confidence
- **Grade C** (0.55-0.69): Orange (#ff9800) - Medium confidence
- **Grade D** (< 0.55): Red (#f44336) - Low confidence

**Display**:

- Badge with grade letter
- Color-coded background
- Tooltip with confidence score

## Layout

### Container

- Max width: 1200px
- Padding: 24px (mobile), 32px (desktop)
- Centered on page

### Grid System

- Use Material UI Grid (12 columns)
- Breakpoints:
  - xs: 0px (mobile)
  - sm: 600px (tablet)
  - md: 900px (desktop)
  - lg: 1200px (large desktop)
  - xl: 1536px (extra large)

### Page Structure

```
┌─────────────────────────────────┐
│ Header / Navigation             │
├─────────────────────────────────┤
│                                 │
│ Main Content Area               │
│ (Container: max-width 1200px)   │
│                                 │
│ ┌──────────┐  ┌──────────┐     │
│ │ Card 1   │  │ Card 2   │     │
│ └──────────┘  └──────────┘     │
│                                 │
└─────────────────────────────────┘
```

## Icons

- **Library**: Material Icons (MUI)
- **Size**: 24px default, 20px for small contexts
- **Color**: Inherit from text color or use semantic colors

**Common Icons**:

- Upload: `CloudUpload`
- Download: `Download`
- Report: `Description`
- Chart: `BarChart`
- Home: `Home`
- Settings: `Settings`
- Check: `CheckCircle`
- Error: `Error`
- Warning: `Warning`

## Shadows

Material UI elevation system:

- **Card**: elevation 2-4
- **Dialog**: elevation 24
- **AppBar**: elevation 4
- **Floating Action Button**: elevation 6

## Animations

- **Duration**: 200-300ms for most transitions
- **Easing**: Material UI default (ease-in-out)
- **Loading**: Circular progress indicator (primary blue)

## Responsive Design

### Mobile (< 600px)

- Single column layout
- Stacked cards
- Full-width buttons
- Smaller font sizes
- Collapsible navigation

### Tablet (600px - 900px)

- 2-column grid where appropriate
- Side-by-side cards
- Medium font sizes

### Desktop (> 900px)

- Multi-column layouts
- Full feature set visible
- Optimal spacing and typography

## Accessibility

- **Color Contrast**: WCAG AA compliant (4.5:1 for text)
- **Focus States**: Clear visible focus indicators
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels
- **Alt Text**: All images have descriptive alt text

## Theme Configuration

```typescript
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
```

## Usage Guidelines

1. **Consistency**: Use Material UI components as base, customize with theme
2. **Color**: Primary blue for trust, semantic colors for status
3. **Spacing**: Use theme spacing units (multiples of 8px)
4. **Typography**: Follow type scale, maintain hierarchy
5. **Responsive**: Design mobile-first, enhance for larger screens
6. **Accessibility**: Always consider contrast, focus states, and screen readers
