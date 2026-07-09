# Reno Notice Board

Reno Notice Board is a clean, modern, light-theme CRUD notice board built with the Next.js Pages Router. Users can view notices, add new notices, edit existing notices, and delete notices with confirmation. Notices are stored permanently in a hosted database through Prisma.

## Tech Stack

- Next.js Pages Router
- JavaScript
- React
- Prisma ORM
- Tailwind CSS
- TiDB Cloud MySQL-compatible database
- Vercel deployment

## Features

- View all notices
- Add a new notice
- Edit an existing notice
- Delete a notice with confirmation
- Store data permanently using Prisma
- Show urgent notices first using backend Prisma `orderBy`
- Show latest notices after urgent priority
- Responsive 1, 2, and 3 column grid
- Light theme UI with white cards, blue accents, and red urgent badges
- Reusable layout, form, list, and card components
- Client-side required field messages
- Server-side API validation
- Loading, error, and empty states

## Folder Structure

```txt
reno-notice-board/
|-- pages/
|   |-- _app.js
|   |-- index.js
|   |-- notices/
|   |   |-- new.js
|   |   `-- [id]/
|   |       `-- edit.js
|   `-- api/
|       `-- notices/
|           |-- index.js
|           `-- [id].js
|-- components/
|   |-- Layout.js
|   |-- NoticeCard.js
|   |-- NoticeList.js
|   `-- NoticeForm.js
|-- lib/
|   |-- prisma.js
|   `-- validateNotice.js
|-- prisma/
|   `-- schema.prisma
|-- styles/
|   `-- globals.css
|-- public/
|   `-- placeholder.png
|-- .env
|-- .env.example
|-- .gitignore
|-- package.json
|-- next.config.js
|-- tailwind.config.js
|-- postcss.config.js
`-- README.md
```

## Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_connection_string"
```

For TiDB Cloud, use a MySQL-compatible connection string:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:4000/notice_board_db?sslaccept=strict"
```

This project uses `provider = "mysql"` in Prisma because TiDB Cloud is MySQL-compatible.

## Install And Run Locally

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000 in your browser.

## Terminal Commands

Install dependencies:

```bash
npm install
```

Set up Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install Prisma:

```bash
npm install prisma @prisma/client
```

Initialize Prisma:

```bash
npx prisma init
```

Generate Prisma Client:

```bash
npx prisma generate
```

Sync schema to TiDB Cloud:

```bash
npx prisma db push
```

Run a migration workflow if your database supports your chosen Prisma migration setup:

```bash
npx prisma migrate dev --name init
```

Start development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## API Routes

- `GET /api/notices` gets all notices with urgent notices first.
- `POST /api/notices` validates and creates a notice.
- `GET /api/notices/[id]` gets one notice.
- `PUT /api/notices/[id]` validates and updates a notice.
- `DELETE /api/notices/[id]` deletes a notice.

Urgent-first sorting is handled in `pages/api/notices/index.js` using Prisma `orderBy`, not frontend sorting.

## Deploy On Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Open Vercel Project Settings.
4. Go to Environment Variables.
5. Add `DATABASE_URL`.
6. Use the same TiDB Cloud connection string from `.env`.
7. Deploy the project.

After deployment, run your Prisma schema sync or migration workflow against the production database.

## Links

- Live Vercel URL: `TODO`
- GitHub Repository: `TODO`

## Future Improvement

With more time, I would add authentication so only authorized users can create, edit, and delete notices.

## AI Usage

AI was used to scaffold and refine the project structure, CRUD API routes, reusable React components, Prisma schema, Tailwind UI, and documentation. The final implementation was reviewed to match the assignment requirements and the TiDB Cloud database setup.
