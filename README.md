## Getting Started

Prerequisits:
- npm
- docker

First, run the development server:

```bash
docker compose up -d
npm update
npm run dev
```

## Prisma
```bash
npx prisma migrate dev
npx prisma studio
```

## ToDos

- [ ] Change Session if user changes profile infos
- [ ] Reset Password via Email
- [ ] 2FA
- [ ] Profile Pic
