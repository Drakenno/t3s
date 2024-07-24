"use server";

import * as z from "zod";
import { RegisterSchema } from "~/app/auth/register";
import { LoginSchema } from "~/app/auth/login";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, messages, posts, comments } from "./db/schema";
import { and, eq, not, or } from "drizzle-orm";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { UserPost } from "~/components/component/dashboard";

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

export const getUserMessages = async (loginId: string, userId: string) => {
  const allMessages = await db
    .select()
    .from(messages)
    .where(
      or(
        and(eq(messages.senderID, loginId), eq(messages.receiverID, userId)),
        and(eq(messages.senderID, userId), eq(messages.receiverID, loginId)),
      ),
    );

  // const userSentMessages = await db
  //   .select()
  //   .from(messages)
  //   .where(eq(messages.senderID, loginId));
  // const userReceivedMessages = await db
  //   .select()
  //   .from(messages)
  //   .where(eq(messages.receiverID, loginId));
  // // console.log();
  // const ALLmessages = [...userSentMessages, ...userReceivedMessages];

  // const sendDeets = await db.query.users.findFirst({
  //   where: eq(users.id, userId),
  // });
  // console.log(sendDeets?.image);
  // const result =
  console.log({ allMessages: allMessages });
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

export const getFormattedMessgesById = async (
  loginId: string,
  userId: string,
) => {
  const allMessages = await getUserMessages(loginId, userId);
  // console.log({ allMessages: allMessages });
  const result = await Promise.all(
    allMessages.map(async (message) => ({
      id: message.id,
      avatar: await getImgById(message.senderID),
      name: await getNameById(message.senderID),
      content: message.content,
    })),
  );
  // console.log({ result_of_formatted_messages: result });
  return result;
};

export const getUserChatDataById = async (userId: string, loginId: string) => {
  const formattedMessages = await getFormattedMessgesById(loginId, userId);
  const avatar = await getImgById(userId);
  // console.log({ formattedMessages: formattedMessages });
  const result = {
    id: userId,
    avatar: avatar,
    messages: formattedMessages,
    name: await getNameById(userId),
  };
  // console.log(result);

  return result;
};

// export const getAllUserChatData = async () => {
//   const allUserIds = await db.select({ id: users.id }).from(users);
//   const allUserChatData = await Promise.all(
//     allUserIds.map(async (userId) => {
//       return await getUserChatDataById(userId.id);
//     }),
//   );

//   return allUserChatData;
// };

export const getAllUserChatDataExceptCurrentUser = async (
  loggedInID: string,
) => {
  // console.log({ loggedInID: loggedInID });
  const restUserIds = await db
    .select({ id: users.id })
    .from(users)
    .where(not(eq(users.id, loggedInID)));
  // console.log({ restUserIds: restUserIds });
  const allUserChatData = await Promise.all(
    restUserIds.map(async (userId) => {
      return await getUserChatDataById(userId.id, loggedInID);
    }),
  );
  // console.log({ allUserChatData: allUserChatData });
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
    console.log({
      loggedInUserId: loggedInUserId,
      selectedUserId: selectedUserId,
      newMessage: newMessage,
    });
    await db.insert(messages).values({
      content: newMessage.content,
      senderID: loggedInUserId,
      receiverID: selectedUserId,
      created_at: new Date(),
    });
    console.log({ newMessage: newMessage });
  } catch (e) {
    console.log(e);
  }
};

export const getStrippedloggedInUserData = async (id: string) => {
  const user = await db
    .select({ id: users.id, name: users.name, avatar: users.image })
    .from(users)
    .where(eq(users.id, id));
  // console.log({ user: user });
  return user[0]!;
};

export const getUserPosts = async (userID: string) => {
  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userID, userID));

  const allComments = await db.select().from(comments);
  const userPostsWithComments = userPosts.map((post) => {
    const comments = allComments.filter((comment) => {
      return comment.postID === post.id;
    });
    return { ...post, comments };
  });
  const trial = await db
    .select()
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postID));
  console.log({ ...trial });
  return userPostsWithComments as UserPost[];
};

export const getloggedInUserData = async (userID: string) => {
  const user = await db.select().from(users).where(eq(users.id, userID));
  return user[0] as {
    email: string;
    password: string | null;
    id: string;
    name: string;
    role: UserRole;
    emailVerified: Date | null;
    image: string;
  };
};

export type allPosts = {
  posts: {
    id: number;
    url: string;
    caption: string;
    likes: number;
    createdAt: Date;
    userID: string;
    // userName?: string;
  };
  userName: string;
  userImg: string;
};

export const getAllPosts = async () => {
  const allPosts = await db
    .select({ posts: posts, userName: users.name, userImg: users.image })
    .from(posts)
    .leftJoin(users, eq(posts.userID, users.id));

  return allPosts as allPosts[];
};

export const getSuggestedUsers = async (userID: string) => {
  const allUsers = await db
    .select({ id: users.id, name: users.name, avatar: users.image })
    .from(users)
    .where(not(eq(users.id, userID)));

  const shuffled = Array.from(allUsers).sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

export const deletePost = async (postID: number) => {
  const deletedPost = await db
    .delete(posts)
    .where(eq(posts.id, postID))
    .returning();
  return deletedPost;
};

export const createPost = async (
  url: string,
  caption: string,
  userID: string,
) => {
  const newPost = await db
    .insert(posts)
    .values({ url: url, userID: userID, caption: caption });
  return newPost;
};

export const increaseLikes = async (id: number, likes: number) => {
  const newLikes = await db
    .update(posts)
    .set({
      likes: likes + 1,
    })
    .where(eq(posts.id, id));

  return newLikes;
};
