"use server";
import { auth, signIn } from "~/auth";

export async function login() {
  await signIn();
  return {};
  //   return async () => {
  //     const sessData = await auth();
  //     console.log(sessData);
  //   };
}
