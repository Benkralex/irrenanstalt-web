#!/bin/bash

git clone https://github.com/benkralx/irrenanstalt-web.git
cd irrenanstalt-web
/bin/bash generate-env.sh
docker-compose up -d
npm install
npx prisma migrate reset
docker compose down