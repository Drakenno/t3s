"use client";
import { FcGoogle } from "react-icons/fc";
// import {FaGithub} from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export default function Social() {
  const onClick = (provider: "google" | "discord") => {
    // console.log("clicked");
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => onClick("discord")}
      >
        <FaDiscord className="h-5 w-5" />
      </Button>
    </div>
  );
}
