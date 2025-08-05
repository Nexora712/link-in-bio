# Architecture

This document outlines the architecture of the LinkBio application.

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Firebase Authentication
- **Database:** Firestore
- **State Management:** React Query, React Context

## Project Structure

The project is organized into the following directories:

- `src/app`: Contains the application's pages and layouts.
- `src/components`: Contains reusable UI components.
- `src/contexts`: Contains React context providers for state management.
- `src/hooks`: Contains custom React hooks.
- `src/lib`: Contains utility functions and library configurations.
- `src/styles`: Contains global CSS styles.
- `src/types`: Contains TypeScript type definitions.

## Authentication Flow

1. The user signs up or logs in using Firebase Authentication.
2. The `onAuthStateChanged` listener in `src/contexts/auth-context.tsx` detects the user's authentication state.
3. If the user is new or hasn't completed the onboarding process, they are redirected to the `/onboarding` page.
4. The user's profile information is stored in a Firestore collection called `users`.

## Theming

The application uses `next-themes` for theme management. The theme can be toggled between light, dark, and system modes. The theme state is managed by the `ThemeProvider` in `src/app/providers.tsx`.

## Data Fetching

The application uses React Query for data fetching and caching. The `useUserStats`, `useNotifications`, and `useLinkAnalytics` hooks in `src/hooks/use-dashboard-data.ts` are used to fetch data for the dashboard.

## Error Handling

The application uses a global error boundary to catch and handle unhandled errors. The `ErrorBoundary` component in `src/components/common/error-boundary.tsx` is wrapped around the entire application in `src/app/providers.tsx`.
