#!/bin/bash

if [ -f .env ]; then
    export $(grep -v '^#' .env | grep "BASE_URL_" | xargs)
else
    echo "Error: .env file not found. Please run generate-env.sh first to create the .env file."
    exit 1
fi

docker compose up -d
npx prisma generate
npx next dev -H ${BASE_URL_HOST-localhost} -p ${BASE_URL_PORT-3000} --webpack
docker compose down