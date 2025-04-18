# Contributing to DrunkCircle

Thank you for your interest in contributing to DrunkCircle! This document provides guidelines and workflows to help you contribute effectively.

## Development Setup

1. **Prerequisites**
   - Node.js (compatible with Next.js 13.3.0)
   - Yarn package manager
   - A Hasura backend (Contact badpirate@gmail.com for database backend setup)

2. **Getting Started**
   ```bash
   # Clone the repository
   git clone git@github.com:BadPirate/drunkcircle.git
   
   # Install dependencies
   yarn install
   
   # Start the development server
   yarn dev
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory.
   - Define the following environment variables (see [README.md](./README.md) for examples):
     - NEXT_PUBLIC_HASURA_ENDPOINT
     - NEXT_PUBLIC_HASURA_WS_ENDPOINT
     - HASURA_GRAPHQL_ADMIN_SECRET
     - NEXT_PUBLIC_URL
     - NEXT_PUBLIC_CALENDAR_URL (optional)
     - NEXT_PUBLIC_GOOGLE_MAP_KEY
     - NEXT_PUBLIC_GOOGLE_CLIENT_ID
     - GOOGLE_CLIENT_SECRET
     - SENDGRID_API_KEY
     - JWT_SECRET
     - HASURA_SERVER_USER_EMAIL
     - HASURA_SERVER_USER_NAME
     - HASURA_SERVER_USER_ROLE

## Project Structure

- `pages/` - Next.js pages and API routes
- `src/`
  - `api/` - API utilities and connections
  - `components/` - Reusable React components
  - `func/` - Utility functions and shared types
  - `graph/` - GraphQL queries, mutations, and type definitions
- `public/` - Static assets
- `styles/` - CSS files

## Coding Standards

### TypeScript

- This project uses TypeScript with strict type checking
- Always define proper interfaces for component props
- Use optional chaining (`?.`) and nullish coalescing (`??`) for handling potentially undefined values

### ESLint Rules

This project follows the Airbnb style guide with some custom modifications:

- No semicolons (`semi: ['error', 'never']`)
- 2-space indentation
- Arrow functions for React components
- No need to import React in JSX files

### Component Structure

- Use functional components with arrow function syntax
- Define component interfaces with proper typing
- Place default props at the bottom of the file
- Export components as default if they're the main component in a file

Example:
```tsx
import { SomeComponents } from 'some-library'

export interface MyComponentProps {
  requiredProp: string;
  optionalProp?: number;
}

const MyComponent = ({ requiredProp, optionalProp }: MyComponentProps) => {
  // Component logic
  return (
    <div>
      {/* JSX content */}
    </div>
  )
}

MyComponent.defaultProps = {
  optionalProp: 0,
}

export default MyComponent
```

## Working with GraphQL

- This project uses Apollo Client for GraphQL operations
- `src/types.ts` is a generated file, do not modify directly
- GraphQL operations are defined in `.graphql` files in the `src/graph` directory
- After modifying GraphQL queries or mutations, regenerate types with:
  ```bash
  yarn schema
  ```

## Testing

- Write tests for new features using Playwright
- Run tests with:
  ```bash
  yarn test
  ```
- End-to-end tests can be run with:
  ```bash
  yarn test:e2e
  ```

## Pull Request Process

1. Fork the repository and create a branch for your feature or bug fix
2. Ensure your code follows the project's coding standards
3. Write tests for your changes when applicable
4. Make sure all tests pass before submitting your PR
5. Update the README.md if needed
6. Submit a pull request with a clear description of your changes

## Code Review

- Run `yarn lint` and clear any warnings or errors after code changes
- Run github tests (using local runner through gh cli) before commit
- All submissions require review
- Changes must pass automated tests
- Address any feedback or requested changes promptly

## License

By contributing to DrunkCircle, you agree that your contributions will be licensed under the project's MIT License.