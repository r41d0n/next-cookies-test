# Development
steps to run the app in development mode

1. Clone the repository
2. Run `npm install`
3. Run `docker-compose up -d`
4. Copy the `.env.example` file to `.env` and fill in the required values
5. Run prisma command `npx prisma migrate dev`
6. run prisma command `npx prisma generate`
7. . Run `npm run dev`
8. Execute seed endpoint localhost:3000/api/seed

# Production


# Testing
default user
__user__: test1@google.com
__password__: 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```