// drizzle/schema.ts
// DTF Manager — SQLite schema using Drizzle ORM (TypeScript)
// ---------------------------------------------------------
// Goals:
// - Offline-first (SQLite), later scalable to LAN/API or Postgres
// - Sync-ready: string UUID primary keys, created_at/updated_at on all tables
// - Money stored in integer cents to avoid floating point errors
// - Separation of concerns: orders/quotes/invoices, products vs inventory, print jobs with DTF params
// - Basic RBAC (roles + permissions) for admin/employee
// ---------------------------------------------------------

import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from 'uuid';

export const uuidv4Sql = uuidv4();
export const nowSql = (new Date()).toISOString();
// -------------------------
// Users, Roles, Permissions
// -------------------------
export const roles = sqliteTable(
  "roles",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name", { enum: ["admin", "employee"] }).notNull(),
    description: text("description"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    nameIdx: uniqueIndex("ux_roles_name").on(t.name),
  })
);

export const permissions = sqliteTable(
  "permissions",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    code: text("code").notNull(), // e.g., "orders.read", "orders.write"
    description: text("description"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ codeUx: uniqueIndex("ux_permissions_code").on(t.code) })
);

export const rolePermissions = sqliteTable(
  "role_permissions",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
    permissionId: text("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
    createdAt: text("created_at").notNull().default(nowSql),
  },
  (t) => ({
    rolePermUx: uniqueIndex("ux_role_permission").on(t.roleId, t.permissionId),
    roleIdx: index("ix_role_permissions_role").on(t.roleId),
    permIdx: index("ix_role_permissions_perm").on(t.permissionId),
  })
);

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    roleId: text("role_id").notNull().references(() => roles.id),
    name: text("name").notNull(),
    email: text("email"), // optional for local setups
    phone: text("phone"),
    passwordHash: text("password_hash"), // if you add login; otherwise omit
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    emailUx: uniqueIndex("ux_users_email").on(t.email),
    roleIdx: index("ix_users_role").on(t.roleId),
  })
);

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}));

// -------------
// Clients
// -------------
export const clients = sqliteTable(
  "clients",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name").notNull(),
    contact: text("contact"),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    notes: text("notes"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ nameIdx: index("ix_clients_name").on(t.name) })
);

// -------------
// Products & Categories (sellable & materials)
// type: material | sellable | consumable | service
// -------------
export const productCategories = sqliteTable(
  "product_categories",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name").notNull(),
    type: text("type", { enum: ["material", "sellable", "consumable", "service"] }).notNull(),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ nameUx: uniqueIndex("ux_product_categories_name").on(t.name) })
);

export const products = sqliteTable(
  "products",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    categoryId: text("category_id").references(() => productCategories.id),
    sku: text("sku"),
    name: text("name").notNull(),
    description: text("description"),
    unit: text("unit", { enum: ["piece", "sheet", "meter", "ml", "g", "service"] }).notNull().default("piece"),
    defaultPriceCents: integer("default_price_cents"), // optional default sell price
    isStocked: integer("is_stocked", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    nameIdx: index("ix_products_name").on(t.name),
    skuUx: uniqueIndex("ux_products_sku").on(t.sku),
    catIdx: index("ix_products_category").on(t.categoryId),
  })
);

// -------------
// Inventory & Stock Movements
// -------------
export const inventory = sqliteTable(
  "inventory",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: real("quantity").notNull().default(0), // allow fractional units for ink (ml)
    minQuantity: real("min_quantity").notNull().default(0),
    location: text("location"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    productUx: uniqueIndex("ux_inventory_product").on(t.productId),
    productIdx: index("ix_inventory_product").on(t.productId),
  })
);

export const stockMovements = sqliteTable(
  "stock_movements",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["in", "out", "adjustment"] }).notNull(),
    quantity: real("quantity").notNull(),
    unitCostCents: integer("unit_cost_cents"), // for valuation
    reason: text("reason"),
    relatedOrderId: text("related_order_id").references(() => orders.id),
    createdBy: text("created_by").references(() => users.id),
    createdAt: text("created_at").notNull().default(nowSql),
  },
  (t) => ({
    prodIdx: index("ix_stock_moves_product").on(t.productId),
    orderIdx: index("ix_stock_moves_order").on(t.relatedOrderId),
    createdAtIdx: index("ix_stock_moves_created_at").on(t.createdAt),
  })
);

// Optional: suppliers for purchases (future scaling)
export const suppliers = sqliteTable(
  "suppliers",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name").notNull(),
    contact: text("contact"),
    email: text("email"),
    phone: text("phone"),
    address: text("address"),
    notes: text("notes"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ nameIdx: index("ix_suppliers_name").on(t.name) })
);

// -------------
// Machine Profiles & DTF Settings History
// -------------
export const machineProfiles = sqliteTable(
  "machine_profiles",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name").notNull(), // e.g., "Epson L1800 - Table 1"
    vendor: text("vendor"), // Epson, etc.
    model: text("model"),
    colorChannels: text("color_channels"), // e.g., "CMYK+W"
    resolutionDpi: integer("resolution_dpi"),
    lastMaintenanceAt: text("last_maintenance_at"),
    notes: text("notes"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  }
);

export const machineSettingsHistory = sqliteTable(
  "machine_settings_history",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    machineProfileId: text("machine_profile_id").notNull().references(() => machineProfiles.id, { onDelete: "cascade" }),
    // Keep free-form JSON to evolve print settings without migrations
    settingsJson: text("settings_json").notNull(), // JSON string { filmType, inkSet, passes, whiteLayers, curingTemp, curingTime, ... }
    createdBy: text("created_by").references(() => users.id),
    createdAt: text("created_at").notNull().default(nowSql),
  },
  (t) => ({
    machineIdx: index("ix_msettings_machine").on(t.machineProfileId),
    createdAtIdx: index("ix_msettings_created_at").on(t.createdAt),
  })
);

// -------------
// Orders, Print Jobs, Quotes, Invoices, Payments
// -------------
export const orders = sqliteTable(
  "orders",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    orderNumber: text("order_number").notNull(), // human friendly, unique
    clientId: text("client_id").notNull().references(() => clients.id),
    status: text("status", { enum: ["draft", "confirmed", "in_production", "ready", "delivered", "cancelled"] }).notNull().default("draft"),
    dueDate: text("due_date"),
    notes: text("notes"),
    createdBy: text("created_by").references(() => users.id),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    orderUx: uniqueIndex("ux_orders_order_number").on(t.orderNumber),
    clientIdx: index("ix_orders_client").on(t.clientId),
    statusIdx: index("ix_orders_status").on(t.status),
    dueIdx: index("ix_orders_due").on(t.dueDate),
  })
);

export const printJobs = sqliteTable(
  "print_jobs",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    // DTF parameters (normalized/optional)
    filmType: text("film_type"),
    inkSet: text("ink_set"), // e.g., "CMYK+W"
    widthMm: integer("width_mm"),
    heightMm: integer("height_mm"),
    colorMode: text("color_mode"), // e.g., RGB/CMYK
    passes: integer("passes"),
    whiteInkLayers: integer("white_ink_layers"),
    curingTempC: integer("curing_temp_c"),
    curingTimeSec: integer("curing_time_sec"),
    machineProfileId: text("machine_profile_id").references(() => machineProfiles.id),

    // Production metrics & costing
    estimatedPrintTimeMin: integer("estimated_print_time_min"),
    actualPrintTimeMin: integer("actual_print_time_min"),
    materialCostCents: integer("material_cost_cents"),
    laborCostCents: integer("labor_cost_cents"),
    overheadCostCents: integer("overhead_cost_cents"),
    totalCostCents: integer("total_cost_cents"),

    // Files & previews
    sourceFilePath: text("source_file_path"),
    previewImagePath: text("preview_image_path"),

    status: text("status", { enum: ["queued", "printing", "completed", "failed", "cancelled"] }).notNull().default("queued"),

    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    orderIdx: index("ix_print_jobs_order").on(t.orderId),
    machineIdx: index("ix_print_jobs_machine").on(t.machineProfileId),
    statusIdx: index("ix_print_jobs_status").on(t.status),
  })
);

// Generic order items (can reference a product OR a print job). Enforce one-of in application layer.
export const orderItems = sqliteTable(
  "order_items",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    productId: text("product_id").references(() => products.id),
    printJobId: text("print_job_id").references(() => printJobs.id, { onDelete: "set null" }),
    description: text("description"),
    quantity: real("quantity").notNull().default(1),
    unitPriceCents: integer("unit_price_cents").notNull().default(0),
    discountCents: integer("discount_cents").notNull().default(0),
    taxRatePct: real("tax_rate_pct").notNull().default(0),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    orderIdx: index("ix_order_items_order").on(t.orderId),
    productIdx: index("ix_order_items_product").on(t.productId),
    printJobIdx: index("ix_order_items_print_job").on(t.printJobId),
  })
);

export const quotes = sqliteTable(
  "quotes",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    quoteNumber: text("quote_number").notNull(),
    clientId: text("client_id").notNull().references(() => clients.id),
    status: text("status", { enum: ["draft", "sent", "accepted", "rejected", "expired"] }).notNull().default("draft"),
    validUntil: text("valid_until"),
    notes: text("notes"),
    pdfPath: text("pdf_path"),
    createdBy: text("created_by").references(() => users.id),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    quoteUx: uniqueIndex("ux_quotes_number").on(t.quoteNumber),
    clientIdx: index("ix_quotes_client").on(t.clientId),
    statusIdx: index("ix_quotes_status").on(t.status),
  })
);

export const quoteItems = sqliteTable(
  "quote_items",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    quoteId: text("quote_id").notNull().references(() => quotes.id, { onDelete: "cascade" }),
    productId: text("product_id").references(() => products.id),
    printJobId: text("print_job_id").references(() => printJobs.id, { onDelete: "set null" }),
    description: text("description"),
    quantity: real("quantity").notNull().default(1),
    unitPriceCents: integer("unit_price_cents").notNull().default(0),
    discountCents: integer("discount_cents").notNull().default(0),
    taxRatePct: real("tax_rate_pct").notNull().default(0),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ quoteIdx: index("ix_quote_items_quote").on(t.quoteId) })
);

export const invoices = sqliteTable(
  "invoices",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    invoiceNumber: text("invoice_number").notNull(),
    orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    currency: text("currency").notNull().default("MGA"),
    status: text("status", { enum: ["draft", "sent", "paid", "overdue", "void"] }).notNull().default("draft"),
    issueDate: text("issue_date").notNull().default(nowSql),
    dueDate: text("due_date"),
    subtotalCents: integer("subtotal_cents").notNull().default(0),
    taxCents: integer("tax_cents").notNull().default(0),
    totalCents: integer("total_cents").notNull().default(0),
    paidCents: integer("paid_cents").notNull().default(0),
    pdfPath: text("pdf_path"),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({
    invUx: uniqueIndex("ux_invoices_number").on(t.invoiceNumber),
    orderIdx: index("ix_invoices_order").on(t.orderId),
    statusIdx: index("ix_invoices_status").on(t.status),
  })
);

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
    amountCents: integer("amount_cents").notNull(),
    method: text("method", { enum: ["cash", "card", "bank_transfer", "mobile_money", "other"] }).notNull().default("cash"),
    paidAt: text("paid_at").notNull().default(nowSql),
    notes: text("notes"),
    createdAt: text("created_at").notNull().default(nowSql),
  },
  (t) => ({ invoiceIdx: index("ix_payments_invoice").on(t.invoiceId) })
);

// -------------
// Expenses & Categories
// -------------
export const expenseCategories = sqliteTable(
  "expense_categories",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    name: text("name").notNull(), // e.g., Materials, Maintenance, Salaries, Electricity
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ nameUx: uniqueIndex("ux_expense_categories_name").on(t.name) })
);

export const expenses = sqliteTable(
  "expenses",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    categoryId: text("category_id").references(() => expenseCategories.id),
    supplierId: text("supplier_id").references(() => suppliers.id),
    amountCents: integer("amount_cents").notNull(),
    occurredAt: text("occurred_at").notNull().default(nowSql),
    description: text("description"),
    createdBy: text("created_by").references(() => users.id),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ catIdx: index("ix_expenses_category").on(t.categoryId) })
);

// -------------
// Attachments & Activity Log
// -------------
export const attachments = sqliteTable(
  "attachments",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    entityType: text("entity_type").notNull(), // e.g., "order", "invoice", "client", "print_job"
    entityId: text("entity_id").notNull(),
    filePath: text("file_path").notNull(),
    mimeType: text("mime_type"),
    createdAt: text("created_at").notNull().default(nowSql),
    createdBy: text("created_by").references(() => users.id),
  },
  (t) => ({ entityIdx: index("ix_attachments_entity").on(t.entityType, t.entityId) })
);

export const activityLog = sqliteTable(
  "activity_log",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    userId: text("user_id").references(() => users.id),
    action: text("action", { enum: ["create", "update", "delete", "status_change", "login"] }).notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    diffJson: text("diff_json"), // JSON diff or snapshot
    createdAt: text("created_at").notNull().default(nowSql),
  },
  (t) => ({ entityIdx: index("ix_activity_entity").on(t.entityType, t.entityId) })
);

// -------------
// App Config (for future LAN mode toggle, etc.)
// -------------
export const appConfig = sqliteTable(
  "app_config",
  {
    id: text("id").primaryKey().default(uuidv4Sql),
    key: text("key").notNull(), // e.g., "mode", "serverUrl", "currency"
    value: text("value").notNull(),
    createdAt: text("created_at").notNull().default(nowSql),
    updatedAt: text("updated_at").notNull().default(nowSql),
  },
  (t) => ({ keyUx: uniqueIndex("ux_app_config_key").on(t.key) })
);

// -----------------
// Relations (samples)
// -----------------
export const ordersRelations = relations(orders, ({ one, many }) => ({
  client: one(clients, { fields: [orders.clientId], references: [clients.id] }),
  items: many(orderItems),
  printJobs: many(printJobs),
  invoice: many(invoices),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  printJob: one(printJobs, { fields: [orderItems.printJobId], references: [printJobs.id] }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  order: one(orders, { fields: [invoices.orderId], references: [orders.id] }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, { fields: [payments.invoiceId], references: [invoices.id] }),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(productCategories, { fields: [products.categoryId], references: [productCategories.id] }),
}));

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  product: one(products, { fields: [stockMovements.productId], references: [products.id] }),
  order: one(orders, { fields: [stockMovements.relatedOrderId], references: [orders.id] }),
  user: one(users, { fields: [stockMovements.createdBy], references: [users.id] }),
}));

// -----------------
// Convenience Types
// -----------------
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type PrintJob = typeof printJobs.$inferSelect;
export type NewPrintJob = typeof printJobs.$inferInsert;
export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

// -----------------
// Notes & Implementation tips
// -----------------
// 1) updated_at maintenance: SQLite lacks ON UPDATE for timestamps; update this column in your data layer.
// 2) UUIDs: Prefer generating with `crypto.randomUUID()` or `@paralleldrive/cuid2` in the app for portability.
// 3) Money: all *Cents columns are integers; format in UI.
// 4) Enforce one-of (productId vs printJobId) in orderItems/quoteItems in the service layer.
// 5) Low-stock alerts: query `inventory.quantity < inventory.min_quantity`.
// 6) Sync-ready: each table has `id`, `created_at`, `updated_at`; keep these for conflict resolution later.
// 7) For migrations, use drizzle-kit to generate SQL from this schema.
// 8) Reporting (monthly sales, profit): compute via SELECTs aggregating invoices/payments and expenses.
