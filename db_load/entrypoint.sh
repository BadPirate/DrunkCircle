#!/bin/bash

set -euo pipefail

echo "Starting database bootstrap..."

POSTGRES_HOST=${POSTGRES_HOST:-db}
POSTGRES_PORT=${POSTGRES_PORT:-5432}
POSTGRES_SUPER_DB=${POSTGRES_DB:-postgres}
DRUNKCIRCLE_DB_NAME=${POSTGRES_DB_NAME:-drunkcircle}
HASURA_DB_NAME=${HASURA_DB_NAME:-hasura}

: "${POSTGRES_USER:?POSTGRES_USER must be set}"
: "${POSTGRES_PASSWORD:?POSTGRES_PASSWORD must be set}"

export PGPASSWORD="${POSTGRES_PASSWORD}"

ensure_database() {
  local db_name="$1"

  local db_exists
  db_exists=$(psql \
    --host "${POSTGRES_HOST}" \
    --port "${POSTGRES_PORT}" \
    --username "${POSTGRES_USER}" \
    --dbname "${POSTGRES_SUPER_DB}" \
    --tuples-only \
    --no-align \
    --command "SELECT 1 FROM pg_database WHERE datname='${db_name}'" || echo "")

  if [[ "${db_exists}" != "1" ]]; then
    echo "Database ${db_name} does not exist, creating..."
    psql \
      --host "${POSTGRES_HOST}" \
      --port "${POSTGRES_PORT}" \
      --username "${POSTGRES_USER}" \
      --dbname "${POSTGRES_SUPER_DB}" \
      --command "CREATE DATABASE \"${db_name}\";"
    echo "Database ${db_name} created"
    touch "/load-state/drunkcircle-unseeded"
  else
    echo "Database ${db_name} already exists"
  fi
}

ensure_database "${DRUNKCIRCLE_DB_NAME}"
ensure_database "${HASURA_DB_NAME}"

unset PGPASSWORD