

# Notice Board

A full CRUD Notice Board built with Next.js (Pages Router) and Prisma, backed by a hosted PostgreSQL database, deployed on Vercel.

## Live Links

- **Live app:** https://reno-notice-board-assignment-delta.vercel.app/
- **GitHub repository:** https://github.com/mishraanshuman786/reno-notice-board-assignment

## Tech Stack

- **Framework:** Next.js (Pages Router)
- **Database access:** Prisma ORM
- **Database:** PostgreSQL (Supabase, free tier)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (Hobby/free tier)

## Features

- List all notices as responsive cards (stacked on mobile, grid on desktop)
- Create and edit notices through a single shared form
- Delete notices with a confirmation step before removal
- Server-side validation on all write operations — required fields and a valid date are enforced inside the API routes, not just in the browser
- Urgent notices always sort above Normal notices, done via Prisma's `orderBy` at the database level (not sorted client-side), with a red "Urgent" badge
- Optional image URL per notice

## How to Run Locally

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <YOUR_REPO_URL>
   cd notice-board
   npm install
   ```

2. **Set up the database connection.** Create a `.env` file in the project root:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require"
   
   ```
   Get this connection string from a free hosted Postgres provider — sign up, create a project, and copy the connection string from the dashboard.

3. **Push the Prisma schema to the database:**
   ```bash
   npx prisma db push
   ```

4. **Generate the Prisma client** (usually automatic via `postinstall`, but run manually if needed):
   ```bash
   npx prisma generate
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## API Routes

| Route                | Method | Purpose                        |
|----------------------|--------|---------------------------------|
| `/api/notices`       | GET    | List all notices (Urgent first) |
| `/api/notices`       | POST   | Create a notice                 |
| `/api/notices/:id`   | GET    | Fetch a single notice           |
| `/api/notices/:id`   | PUT    | Update a notice                 |
| `/api/notices/:id`   | DELETE | Delete a notice                 |

All write routes validate required fields (`title`, `body`, `publishDate`) and enum values (`category`, `priority`) on the server before touching the database.

## One Thing I Would Improve With More Time

I would make the API calling layer more organized and manageable — right now components call `fetch` directly inside handlers. With more time, I'd introduce a proper API service layer (using Axios) with separate functions per resource (e.g. `noticeApi.create()`, `noticeApi.update()`, `noticeApi.delete()`), and structure the backend similarly with dedicated controller-style functions instead of putting all logic directly inside the route handlers. This would make the codebase easier to test, extend, and reason about as it grows.

## Where and How AI Was Used

I generally work with TypeORM, so Prisma's schema-first workflow and query API were new to me for this project. I used Claude to:
- Understand how Prisma works and how it differs from TypeORM (schema definition, `prisma generate`, `prisma db push`, and the generated client's query patterns), so I could get up to speed quickly.
- Understand the assignment requirements faster and more clearly — especially the specifics around server-side ordering (Urgent-first via `orderBy`) and where server-side validation needed to live.
- Scaffold the initial project structure as a reference (Prisma schema, API routes, pages/components), which I then went through, typed out, and adapted myself.
- Debug issues I ran into while coding and setting up — including Prisma client generation errors, database connection string/SSL formatting across different providers, and a few typos in my own schema and component code.

All functionality was reviewed, tested locally, and understood by me before committing — including verifying the create/edit/delete flow, server-side validation, and the Urgent-first ordering logic in the API routes.

## Checklist Before Submitting

- [ ] Vercel app is public and opens without logging in
- [ ] GitHub repository is public and opens without logging in
- [ ] GitHub repository has real, incremental commit history (not a single commit)
- [ ] Both links are submitted using the link provided in the assignment email