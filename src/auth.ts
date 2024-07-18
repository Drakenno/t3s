import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { db } from "./server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { users, accounts } from "./server/db/schema";
import { LoginSchema } from "./app/auth/login";
import { getUserByEmail } from "./server/actions";
import bcrypt from "bcryptjs";

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: {
    strategy: "jwt",
    maxAge: 600,
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null;
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log(validatedFields);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log(email, password);
          user = await getUserByEmail(email);
          console.log(user);
          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(passwordsMatch);
          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
