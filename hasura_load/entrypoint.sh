#!/bin/bash

set -euo pipefail

echo "Starting hasura migration..."

HASURA_GRAPHQL_ENDPOINT=${HASURA_CLI_ENDPOINT:-http://hasura:8080}

: "${HASURA_GRAPHQL_ADMIN_SECRET:?HASURA_GRAPHQL_ADMIN_SECRET must be set}"
export HASURA_GRAPHQL_ADMIN_SECRET
export HASURA_GRAPHQL_ENDPOINT

echo "Applying Hasura metadata..."
hasura metadata apply --skip-update-check
echo "Metadata applied"

if [ -d migrations ] && [ "$(ls -A migrations)" ]; then
  echo "Applying Hasura migrations..."
  hasura migrate apply --all-databases --skip-update-check
  echo "Migrations applied"
else
  echo "No migration data found, skipping"
fi

if [ -f "/load-state/drunkcircle-unseeded" ] && [ -d seeds ] && [ "$(ls -A seeds)" ]; then
  echo "Applying Hasura seeds..."
  hasura seed apply --database-name DrunkCircle --skip-update-check
  echo "Seeds applied"
  rm "/load-state/drunkcircle-unseeded"
else
  echo "No seed data found, skipping"
fi

hasura metadata reload

echo "Hasura migration complete"