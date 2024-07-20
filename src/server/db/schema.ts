// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

import { UserRole } from "~/server/actions";

import type { AdapterAccountType } from "next-auth/adapters";

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
    url: varchar("url", { length: 1024 }).notNull(),
    caption: varchar("caption", { length: 1024 }),
    likes: integer("likes").default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userID: text("userID")
      .notNull()
      .references(() => users.id),
  },
  (example) => ({
    urlIndex: index("url_idx").on(example.url),
  }),
);

export const messages = createTable("message", {
  id: serial("id").primaryKey(),
  senderID: text("sender_id")
    .notNull()
    .references(() => users.id),
  receiverID: text("receiver_id")
    .notNull()
    .references(() => users.id),
  content: text("message").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const comments = createTable("comment", {
  id: serial("id").primaryKey(),
  postID: integer("post_id")
    .notNull()
    .references(() => posts.id),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  role: text("role").$type<UserRole>().notNull().default("user"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("avatar", { length: 1024 }).default(
    "https://utfs.io/f/b5b33a74-6a71-4140-a418-cf7ec21a5f2b-qerhnf.jpg",
  ),
});

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);
