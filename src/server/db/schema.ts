// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3s_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    url: varchar("url").notNull(),
    caption: varchar("caption"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    // updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    //   () => new Date()
    // ),
  },
  (example) => ({
    urlIndex: index("url_idx").on(example.url),
  }),
);
