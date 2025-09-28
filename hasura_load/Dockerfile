FROM debian:bookworm-slim

ARG HASURA_CLI_VERSION=2.48.5

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | VERSION=v${HASURA_CLI_VERSION} bash

COPY hasura /hasura
COPY entrypoint.sh /entrypoint.sh

WORKDIR /hasura

ENTRYPOINT ["/entrypoint.sh"]
