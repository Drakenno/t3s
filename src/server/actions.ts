"use server";

import * as z from "zod";
import { RegisterSchema } from "~/app/auth/register";
import { LoginSchema } from "~/app/auth/login";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export const getUserByEmail = async (email: string) => {
  // const user = await db.select().from(users).where(eq(users.email, email));
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user;
};

export const getUserById = async (id: string) => {
  // const user = await db.select().from(users).where(eq(users.id, id));
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return user;
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email or password", success: "" };
  }

  const { email, password } = validatedFields.data;
  console.log(email, password);
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    console.log("RESULT of SIGNIN: ", result);
    // console.log(result);
    // redirect("/settings");
    return { error: "", success: "SignIn successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password", success: "" };
        default:
          return { error: "Something went wrong", success: "" };
      }
    } else if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);
    return { error: "catch error", success: "" };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }
  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }
  await db.insert(users).values({
    email,
    password: hashedPassword,
    name: username,
  });
  return { success: "SignIn successful" };
};
