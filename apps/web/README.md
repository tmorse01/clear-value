# CompClear Web Frontend

React 19 + TypeScript + Vite frontend application for CompClear real estate valuation platform.

## Tech Stack

- **Framework**: React 19+ with React Compiler
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Styling**: CSS Modules + MUI's `sx` prop system
- **State Management**: TanStack Query + React Context
- **Charts**: Material UI Charts (primary), Recharts (fallback)

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Layout/    # Layout components (Container, etc.)
├── config/        # Configuration files
│   └── api.ts     # API configuration
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── providers/     # App-level providers (Theme, Query, etc.)
├── services/      # API service functions
├── theme/         # MUI theme configuration
├── types/         # TypeScript type definitions
├── App.tsx        # Main app component
└── main.tsx       # App entry point
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (workspace package manager)

### Installation

From the workspace root:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in `apps/web/`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Building

Build for production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## Architecture

### Theme

The app uses a custom MUI theme based on the design system (see `docs/design-system.md`). The theme is configured in `src/theme/theme.ts` and includes:

- Primary blue color scheme (#2196f3)
- Custom typography scale
- Component overrides
- Confidence grade colors

### API Client

API requests are handled through:

- `src/config/api.ts` - API configuration
- `src/services/api.ts` - Generic API request functions
- `src/hooks/useApi.ts` - React Query hook for API calls

### State Management

- **TanStack Query**: Server state management (API data, caching)
- **React Context**: Client state management (UI state, user preferences)

## Usage Examples

### Using MUI Components

```tsx
import { Button, Card, Typography } from "@mui/material";

function MyComponent() {
  return (
    <Card>
      <Typography variant="h4">Title</Typography>
      <Button variant="contained" color="primary">
        Click me
      </Button>
    </Card>
  );
}
```

### Using TanStack Query

```tsx
import { useApiQuery } from "../hooks";

function DataComponent() {
  const { data, isLoading, error } = useApiQuery<MyDataType>("/endpoint");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
}
```

### Using CSS Modules

Create a `.module.css` file:

```css
.container {
  padding: 16px;
}
```

Import and use:

```tsx
import styles from "./MyComponent.module.css";

function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
