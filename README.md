# DrunkCircle

DrunkCircle is a collaborative platform for the Hash House Harriers community. It provides tools for managing trails, kennels, and events, making it easier for members to connect and organize activities.

## Features

- **Trail Management**: Add, edit, and view trails for your kennel.
- **Kennel Directory**: Search and manage kennel information.
- **Hasher Profiles**: Manage hasher details and participation.
- **Google Calendar Integration**: Sync events with Google Calendar.

## Development Requirements

This project requires a Hasura backend (GraphQL) for development. If you want to start your own instance, please reach out to badpirate@gmail.com to get set up with a database backend.

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:BadPirate/drunkcircle.git
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env.local` file in the project root with the required environment variables (see **Environment Variables** below).
4. Start the development server:
   ```bash
   yarn dev
   ```

## Environment Variables

Create a `.env.local` file in the project root with the following environment variables:

- NEXT_PUBLIC_HASURA_ENDPOINT: Your Hasura GraphQL endpoint (e.g., https://your-hasura-instance/v1/graphql)
- NEXT_PUBLIC_HASURA_WS_ENDPOINT: Your Hasura GraphQL WebSocket endpoint (e.g., wss://your-hasura-instance/v1/graphql)
- HASURA_GRAPHQL_ADMIN_SECRET: Your Hasura admin secret
- NEXT_PUBLIC_URL: Base URL of your application (e.g., http://localhost:3000)
- NEXT_PUBLIC_CALENDAR_URL: (optional) URL used for calendar links (defaults to NEXT_PUBLIC_URL)
- NEXT_PUBLIC_GOOGLE_MAP_KEY: Your Google Maps API key
- NEXT_PUBLIC_GOOGLE_CLIENT_ID: Google OAuth client ID for Calendar authorization
- GOOGLE_CLIENT_SECRET: Google OAuth client secret for Calendar authorization
- SENDGRID_API_KEY: SendGrid API key for sending emails
- JWT_SECRET: Secret for signing JSON Web Tokens (used for Hasura JWTs)
- HASURA_SERVER_USER_EMAIL: Service account email for server-side Hasura operations
- HASURA_SERVER_USER_NAME: Service account name for server-side Hasura operations
- HASURA_SERVER_USER_ROLE: Role for the service account (e.g., service_role)

## Contributing

Contributions are welcome! Before contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide which contains detailed information about:

- Development environment setup
- Project structure
- Coding standards and style guidelines
- Working with GraphQL
- Testing practices
- Pull request process

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.