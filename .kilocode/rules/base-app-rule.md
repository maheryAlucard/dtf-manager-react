General:
Use TypeScript everywhere (.ts / .tsx) with strict typing enabled.
Prefer composition over inheritance.
Keep functions small, pure, and reusable.
Always write self-explanatory variable and function names.

Project Architecture:
Structure code by domain feature, not only by tech (e.g. orders/, inventory/, billing/).
Separate main (Electron), renderer (React), and db (Drizzle) clearly.
Never access DB directly from React → always go through IPC service layer.
Keep shared types in /src/shared/.

lectron Main Process:
Use contextBridge + ipcMain for safe communication.
Expose only whitelisted APIs to the renderer.
All DB calls and filesystem interactions happen here.

React + Tailwind:
Use functional components with hooks.
Apply Tailwind classes directly in JSX, but extract repetitive patterns into components.
State management:
React Query for async server/DB state.
Context for global UI state (theme, user).
All UI must be responsive.

Database (Prisma ORM + PostgreSQL):
IDs → always text (UUID-like).
Money → always stored as integer cents.
Always provide created_at and updated_at timestamps.

Services & Business Logic:
Each feature (Orders, Invoices, Inventory…) has its own service file in /src/main/services/.
Services are the only layer that talks to the DB.
Services expose async functions with input validation.

Code Style:
Follow ESLint + Prettier rules.
No any, use explicit types.
Prefer const over let.
Avoid side effects in functions unless necessary.

Future-Proofing (Sync & Scaling):
Always include updated_at and deleted_at (nullable) fields for future sync.
Write code so it can later switch from SQLite → Postgres with minimal changes.
Keep separation between domain logic and UI, so sync layer can be added later.

IMPORTANT:
You must use FR text for any text in the app, if other language are writen, replace by there translation.