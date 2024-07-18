import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  authenticators,
} from "./server/db/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  providers: [Google],
});
