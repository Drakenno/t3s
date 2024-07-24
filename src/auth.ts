import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { db } from "./server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { users, accounts } from "./server/db/schema";
import { UserRole } from "./server/actions";
import { LoginSchema } from "./app/auth/login";
import { getUserByEmail, getUserById } from "./server/actions";
import bcrypt from "bcryptjs";
import { env } from "./env";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role: "user" | "admin";
//     } & DefaultSession["user"];
//   }
// }

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
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
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const exsistingUser = await getUserById(token.sub);
      if (!exsistingUser) {
        return token;
      }
      token.role = exsistingUser.role as UserRole;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
