# Reno Notice Board

A small Next.js notice-board app for creating, editing, listing, and deleting community notices. It uses the Pages Router, API routes, Prisma, and a local SQLite database for easy setup.

## Project Structure

```text
pages/
  _app.js
  index.js
  notices/new.js
  notices/[id]/edit.js
  api/notices/index.js
  api/notices/[id].js
components/
  Layout.js
  NoticeCard.js
  NoticeList.js
  NoticeForm.js
lib/
  prisma.js
  validateNotice.js
prisma/schema.prisma
styles/globals.css
public/placeholder.png
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

3. Create the local database:

```bash
npm run db:push
```

4. Start the app:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Useful Commands

```bash
npm run dev       # Run the development server
npm run build     # Build for production
npm run start     # Start the production build
npm run db:push   # Sync Prisma schema to SQLite
npm run db:studio # Open Prisma Studio
```
