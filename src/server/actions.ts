"use server";

import * as z from "zod";
import { RegisterSchema } from "~/app/auth/register";
import { LoginSchema } from "~/app/auth/login";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, messages } from "./db/schema";
import { and, desc, eq, not, or, sql } from "drizzle-orm";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { AuthError, User } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export type UserRole = "user" | "admin";

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
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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

export type Message = {
  id: number;
  name: string;
  avatar: string;
  content: string;
};

export type UserChatData = {
  id: string;
  avatar: string;
  messages: Message[];
  name: string;
};

// export const getUserChatData = async (userId: string) => {
//   const user = await db.query.users.findFirst({
//     where: eq(users.id, userId),
//   });
//   const chats = await db
//     .select()
//     .from(messages).j
//     .where(eq(messages.senderID, userId));
//   return {
//     id: user?.id,
//     name: user?.name,
//     email: user?.email,
//     avatar: user?.avatar,
//     messages: messages.map((message) => ({
//       id: message.id,
//       avatar:
//         message.senderID === user.id ? user.avatar : loggedInUserData.avatar,
//       name: message.senderID === user.id ? user.name : loggedInUserData.name,
//       content: message.content,
//     })),
//   };
// };

// export const getUserChatData = async (userId: string) => {
//   // Fetch user data
//   const user = await db.select().from(users).where(eq(users.id, userId));

//   if (!user) {
//     return null; // User not found
//   }

//   // Fetch messages where the user is either sender or receiver
//   const userMessages = await db
//     .select()
//     .from(messages)
//     .where(or(eq(messages.senderID, userId), eq(messages.receiverID, userId)))
//     .orderBy(desc(messages.created_at));

//   // Format messages
//   const formattedMessages: Message[] = await Promise.all(
//     userMessages.map(async (msg) => {
//       // Fetch sender's name and avatar
//       const sender = await db
//         .select()
//         .from(users)
//         .where(eq(users.id, msg.senderID));
//       console.log(sender);
//       return {
//         id: msg.id,
//         avatar: sender[0]?.avatar || "",
//         sname: sender[0]?.name || "",
//         sID: msg.senderID,
//         rID: msg.receiverID,
//         content: msg.content,
//       };
//     }),
//   );

//   // Prepare user chat data
//   const userChatData: UserChatData = {
//     id: user[0]!.id,
//     name: user[0]!.name!,
//     email: user[0]!.email,
//     avatar: user[0]!.avatar!,
//     messages: formattedMessages,
//   };

//   return userChatData;
// };

export const getUserMessages = async (userId: string) => {
  const allMessages = await db
    .select()
    .from(messages)
    .where(or(eq(messages.senderID, userId), eq(messages.receiverID, userId)));

  const sendDeets = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  // console.log(sendDeets?.image);
  // const result =
  return allMessages;
};

export const getImgById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user!.image as string;
  } catch (e) {
    console.log(e);
    return "";
  }
  // console.log(user?.image);
};

export const getNameById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user!.name;
  } catch (error) {
    console.log(error);
    return " ";
  }
};

export const getFormattedMessgesById = async (userId: string) => {
  const allMessages = await getUserMessages(userId);
  // console.log(allMessages);
  const result = await Promise.all(
    allMessages.map(async (message) => ({
      id: message.id,
      avatar: await getImgById(message.receiverID),
      name: await getNameById(message.receiverID),
      content: message.content,
    })),
  );
  // console.log(result);
  return result;
};

export const getUserChatDataById = async (userId: string) => {
  const formattedMessages = await getFormattedMessgesById(userId);
  const avatar = await getImgById(userId);
  const result = {
    id: userId,
    avatar: avatar,
    messages: formattedMessages,
    name: await getNameById(userId),
  };
  // console.log(result);

  return result;
};

export const getAllUserChatData = async () => {
  const allUserIds = await db.select({ id: users.id }).from(users);
  const allUserChatData = await Promise.all(
    allUserIds.map(async (userId) => {
      return await getUserChatDataById(userId.id);
    }),
  );

  return allUserChatData;
};

export const getAllUserChatDataExceptCurrentUser = async (
  loggedInID: string,
) => {
  console.log({ loggedInID: loggedInID });
  const restUserIds = await db
    .select({ id: users.id })
    .from(users)
    .where(not(eq(users.id, loggedInID)));
  console.log({ restUserIds: restUserIds });
  const allUserChatData = await Promise.all(
    restUserIds.map(async (userId) => {
      return await getUserChatDataById(userId.id);
    }),
  );

  return allUserChatData;
};

export const getUserIdByName = async (name: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.name, name),
  });
  return user!.id;
};

export const messageDbPush = async (
  newMessage: Message,
  loggedInUserId: string,
  selectedUserId: string,
) => {
  try {
    await db.insert(messages).values({
      content: newMessage.content,
      senderID: loggedInUserId,
      receiverID: selectedUserId,
      created_at: new Date(),
    });
  } catch (e) {
    console.log(e);
  }
};
