FROM alpine:3.19

RUN apk add --no-cache postgresql15-client bash

COPY entrypoint.sh entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

