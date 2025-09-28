DrunkCircle is a collaborative platform for the Hash House Harriers community. It provides tools for managing trails, kennels, and events, making it easier for members to connect and organize activities.

## Features

- **Trail Management**: Add, edit, and view trails for your kennel.
- **Kennel Directory**: Search and manage kennel information.
- **Hasher Profiles**: Manage hasher details and participation.
- **Google Calendar Integration**: Sync events with Google Calendar.

## Contributing / License

- See first the [Down Down License](LICENSE.md)
- After making changes, submit your changes to a fork (or if you have permission a non-main non-dev branch for PR review)

## Development

1. Clone the repository:
   ```bash
   git clone git@github.com:BadPirate/drunkcircle.git
   ```
2. Install nvm
3. Install correct version of node: `nvm install && nvm use`
4. Install yarn `npm -g install yarn`
5. Install dependencies: `yarn install`
6. Move and upate [.env.EXAMPLE] to [.env] `mv .env.EXAMPLE .env` file in the project root with the required environment variables (see **Environment Variables** below).
7. Install docker and docker compose if needed
8. Launch locally with docker `yarn up`
9. Bring down when you are done with `yarn down`

You can also run dev server for better debugging and live changes:

1. `yarn up && docker compose down next`
2. `yarn dev`

## Services

When running locally:

- Database (Postgres 15): localhost:6701
- Hasura: http://localhost:6702 (password in .env)
- DrunkCircle: http://localhost:6703

## Schema Changes

After making changes with local development Hasura UI (http://localhost:6702) -- Must create a new migration:

- Install hasura cli if needed, `yarn setup`
- `cd hasura_load/hasura`
- `hasura migration create <migration_name> --endpoint http://localhost:6702 --admin-secret <dev_admin_secret>` which
  should create the new migration

## Environment Variables

These need to be set for various actions to work

- GOOGLE_CLIENT_ID=replace_with_real_app_id.apps.googleusercontent.com
- GOOGLE_CLIENT_SECRET=-replace_with_real_secret
- NEXT_PUBLIC_GOOGLE_CLIENT_ID=replace_with_real_client_id_again.apps.googleusercontent.com
- NEXT_PUBLIC_GOOGLE_MAP_KEY=replace_with_google_map_key
- SENDGRID_API_KEY=replace_with_sendgrid_api_key
- SMTP_SERVER=smtp://smtpuser:smtppass@smtp.mailgun.org:587