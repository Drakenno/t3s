"use client";
import { auth, signIn } from "~/auth";
import { Button } from "../ui/button";
// import { use } from "react";
import { login } from "~/server/actions";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { on } from "events";

type LoginBtnProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export function LoginBtn({
  children,
  mode = "redirect",
  asChild = false,
}: LoginBtnProps) {
  //   const [sess, setSess] = useState(null);
  //   const fetchSess = async () => {
  //     const sessData = await auth();
  //     setSess(sessData);
  //   };
  const router = useRouter();
  const onClick = () => {
    router.push("/login");
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
