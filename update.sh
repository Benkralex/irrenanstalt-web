#!/bin/bash

git pull
docker compose up -d
npx prisma migrate dev
docker compose down