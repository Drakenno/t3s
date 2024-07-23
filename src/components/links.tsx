"use client";

import { Session } from "next-auth";
import { LinkProperties } from "./chat/chat-layout";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";

export type LinksProps = {
  key: string;
  chatYN: boolean;
  session: Session | null;

  link: LinkProperties;
};
export default function Links({ chatYN, session, link }: LinksProps) {
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
      key={link.id}
      href={convertLinkIdsToHrefsUsingChatYN(chatYN, session, link.id)}
      className={cn(
        buttonVariants({ variant: link.variant, size: "xl" }),
        link.variant === "grey" &&
          "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start gap-4",
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
      </Avatar>
      <div className="flex max-w-28 flex-col">
        <span>{link.name}</span>
        {link.messages.length > 0 && (
          <span className="truncate text-xs text-zinc-300">
            {link.messages[link.messages.length - 1]?.name.split(" ")[0]}:{" "}
            {link.messages[link.messages.length - 1]?.content}
          </span>
        )}
      </div>
    </Link>
  );
}
