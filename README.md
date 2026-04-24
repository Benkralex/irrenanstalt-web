## Getting Started

Prerequisits:
- npm
- docker

First, run the development server:

```bash
docker compose up -d
npm install
npm run dev
```

## Prisma
```bash
npx prisma migrate dev
npx prisma studio
```

## ToDos

- [x] Change Session if user changes profile infos
- [ ] Verify Email if changed
- [ ] Reset Password via Email
- [ ] 2FA
- [ ] Profile Pic
