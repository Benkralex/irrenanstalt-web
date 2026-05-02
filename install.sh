#!/bin/bash

git clone https://github.com/Benkralex/irrenanstalt-web.git
cd irrenanstalt-web
/bin/bash generate-env.sh
docker-compose up -d
npm install
npx prisma migrate reset --force
docker compose down