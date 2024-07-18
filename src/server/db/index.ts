// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { env } from "~/env";
import * as schema from "./schema";
import { createPool } from "@vercel/postgres";
// import * as z from "zod";

// import { createClient } from "@vercel/postgres";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof createPool> | undefined;
};

const conn =
  globalForDb.conn ?? createPool({ connectionString: env.POSTGRES_URL });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
