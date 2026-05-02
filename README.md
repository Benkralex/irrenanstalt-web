# Irrenanstalt-Web-Platform
A event managment and a little bit of social media plattform for use in a friendgroup

# Dev-env
## Setup dev-env

Prerequisits:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [docker](https://docs.docker.com/engine/install/)
- Works best on Linux ;-D
```bash
git clone https://github.com/Benkralex/irrenanstalt-web # Clone repo
cd irrenanstalt-web # Go into repo
mv .env.example .env # Copy example-env to real-env
```


**Edit `.env`**

```bash
docker compose up -d # Start DB server
npm install # Install dependencies
npx prisma migrate reset # Init DB
docker compose down # Stop DB server
```

## Start dev-env

```bash
docker compose up -d # Start DB server
npm run dev # Run dev-website
```
Optionally:
```bash
npx prisma studio # Run raw DB access client
```

## Update dev-env

```bash
git pull # Update repo
npx prisma mirgrate dev # Migrate DB
```

# Features
## Finished
- Login with Email/Username and Password
- 2FA
- Invite via Email
- Verify Email


## In Progress
- Null

## ToDo
- Verify Email if changed
- Reset Password via Email
- Profile Pic
- Event System