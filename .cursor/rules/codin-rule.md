Frontend Coding Rules – DTF Manager
Project Structure & Components

Organize by domain / feature: each feature gets its own folder:
```
src/
  pages/       → top-level pages (Dashboard, Orders, Stock, Reports)
  components/  → reusable components (Button, Modal, Table)
  hooks/       → custom React hooks
  context/     → global state (theme, auth, notifications)
  services/    → API / IPC calls (Electron)
  types/       → shared TypeScript types
  utils/       → helpers, formatters

```

Components:
Small, single-purpose, reusable.
Naming: PascalCase.tsx (e.g., OrderCard.tsx).

Folder structure per component:
```
OrderCard/
  OrderCard.tsx
  OrderCard.test.tsx
  OrderCard.module.css / OrderCard.styles.ts (optional)
  index.ts (export default OrderCard)

```

Pages:
Each page is a React functional component in pages/.
Page names reflect routes: DashboardPage.tsx, OrdersPage.tsx.
Pages should mostly orchestrate components and minimal logic.

Styling (Tailwind):
Use Tailwind classes in JSX.
Extract repetitive class sets into reusable component classes or clsx functions.
Use Theme 2 colors consistently (bg-primary, text-secondary, etc.).
Avoid inline styles except for dynamic values.
Support dark/light mode if possible.

State Management:
Use React Query for async DB/API state.
Use React Context for global UI state (theme, user, notifications).
Page-local state: useState / useReducer.
Avoid prop drilling → use context/hooks where needed.
Use Zustand for global state needs.

Component Design Principles:
Single Responsibility Principle: each component does one thing.
Props: always type with interfaces, never any.
Children & slots: use children for generic containers (e.g., Card, Modal).
Reusability: buttons, tables, inputs, modals must be reusable across pages.
Event handlers: pass functions as props, never tightly couple business logic.

Pages & Routing:
React Router (or similar) for page navigation.
Each page imports only components & hooks it needs.
Pages handle:
Fetching data
Passing data to components
Handling user interactions (via service layer)

Nested Pages / Modals:
Example: /orders/:orderId → OrderDetailsPage.tsx opens modal or new route.

Reusability Patterns:
UI Components: Button, Input, Modal, Table, Card, Badge.
Layout Components: Sidebar, Topbar, PageContainer.
Hooks: useOrders, useClients, useStock → encapsulate data fetching + state.
Utilities: formatters (currency, dates), validators, helpers.

Code Quality & Conventions:
TypeScript strict mode ON.
No any. Use proper types & interfaces.
ESLint + Prettier enforced.
Functional components only. No class components.
Keep functions small (<30 lines if possible).
Prefer composition over inheritance.

Naming Conventions

Components / Pages → PascalCase: OrdersPage, OrderCard
Hooks → useSomething: useOrders, useStock
Context → SomethingContext: ThemeContext
Files → match component or feature name.
Variables → camelCase.

Future-Proofing

Components must support reusability in multi-workshop / LAN mode.
Keep UI logic separated from data fetching, so swapping SQLite → server later is easy.
Keep theme colors & spacing centralized for consistency.

Icons
Use lucid icons for any icon needed

For any currency, use Ar instead of $