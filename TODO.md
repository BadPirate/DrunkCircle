# DrunkCircle Stack Ranked TODO List

This document outlines feature enhancements, non-functional improvements, and technical debt items for DrunkCircle,
stack ranked to guide development.

- Playwright tests for authenticated flows
- Allow users to setup / change hash name
- Implement startup-time validation for all required `process.env` variables with clear error messages. Centralize configuration (e.g., `config.ts`) to avoid scattered `process.env` access.
- Notifications
- UI Refactor / Re-design
- Allow for commenting / conversation on trails
- Allow hashers to upload photos for trails and events (e.g., S3 or similar storage integration).
- Add a mode to "import" a read only hash (Hashes that don't want to or aren't yet using drunkcircle)
- Standardize structured logging for API and GraphQL adapters.
- "Componentize" UI - Find any recurring UI elements / complex sub-cards / etc and turn into their own card / file
  following a principle of smaller component files rather than large ones with single exports
- [ ] **Refactor GraphQL Clients**
- Consolidate `HasuraClient`, `ServerClient`, and related link configurations into a single reusable module.
- Remove deprecated or duplicated code paths (e.g., disable persisted queries link logic).

## When we get bigger

Lowest priority tasks for when it's more than just one developer working on project

- Configure GitHub Actions (or equivalent) to run lint, type-check, GraphQL codegen, unit tests, and Playwright tests on every PR.
- Integrate Sentry (or similar) for client/server error reporting.
- Increase code coverage threshold (e.g., 80%) and enforce via CI.
- Expand architectural diagrams and developer setup instructions.