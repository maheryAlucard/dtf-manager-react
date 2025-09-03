import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    strict: true,
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
    },
});
