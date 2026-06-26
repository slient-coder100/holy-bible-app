# Holy Bible App

A full-stack Bible web application with all 66 books, daily prayers, community chat, authentication, and verse favorites.

## Features

- **Complete Bible Browser** - All 66 books of the Bible (Old & New Testament) with chapters and verses (KJV)
- **Daily Verse** - A curated verse of the day that changes daily
- **Search** - Full-text search across all Bible verses
- **Daily Prayers** - Prayers organized by day of the week with categories
- **Community Chat** - Live chat with fellow believers (requires sign-in)
- **Favorite Verses** - Save and manage your favorite verses (requires sign-in)
- **User Authentication** - OAuth 2.0 sign-in (optional for Bible reading, required for chat & favorites)

## Tech Stack

**Frontend:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui
**Backend:** Hono + tRPC + Drizzle ORM + MySQL
**Auth:** OAuth 2.0 with JWT sessions

## Project Structure

```
├── src/              # Frontend React components & pages
├── api/              # Backend tRPC routers & Hono server
├── db/               # Database schema & seed data
├── contracts/        # Shared types between frontend & backend
└── public/data/      # Bible books metadata & KJV verses
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`

3. Push database schema:
```bash
npm run db:push
```

4. Seed prayers data:
```bash
npx tsx db/seed.ts
```

5. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Type-check TypeScript
- `npm run db:push` - Sync database schema
- `npm run db:generate` - Generate migration SQL
- `npm run db:migrate` - Apply pending migrations
