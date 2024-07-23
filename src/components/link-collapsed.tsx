"use client";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LinkProperties } from "./chat/chat-layout";
import path from "path";
import { useState, useEffect } from "react";

type LinkCollapsedProps = {
  chatYN: boolean;
  session: Session | null;
  link: LinkProperties;
};
export default function LinkCollapsed({
  chatYN,
  session,
  link,
}: LinkCollapsedProps) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const convertLinkIdsToHrefsUsingChatYN = (
    chatYN: boolean,
    session: Session | null,
    uid: string,
  ) => {
    if (chatYN) {
      const x = {
        chatYN: chatYN,
        id: session?.user.id,
        uid: uid,
        pathname: origin + "/users/" + session?.user.id + "/" + uid,
      };
      return x.pathname;
    }
    return origin + "/users/" + session?.user.id + "/";
  };
  return (
    <Link
      href={convertLinkIdsToHrefsUsingChatYN(chatYN, session, link.id)}
      className={cn(
        buttonVariants({
          variant: link.variant,
          size: "icon",
        }),
        "h-11 w-11 md:h-16 md:w-16",
        link.variant === "grey" &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
      )}
    >
      <Avatar className="flex items-center justify-center">
        <AvatarImage
          src={link.avatar}
          alt={link.avatar}
          width={6}
          height={6}
          className="h-10 w-10"
        />
      </Avatar>{" "}
      <span className="sr-only">{link.name}</span>
    </Link>
  );
}
