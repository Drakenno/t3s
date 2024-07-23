// "use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LinkProperties } from "./chat/chat-layout";
// import { headers } from "next/headers";
import { Session } from "next-auth";
import LinkCollapsed from "./link-collapsed";
import Links from "./links";

type SidebarProps = {
  isCollapsed: boolean;
  links: LinkProperties[];
  // onClick?: () => void;
  isMobile: boolean;
  chatYN: boolean;
  session: Session | null;
};

export default function Sidebar({
  links,
  isCollapsed,
  isMobile,
  chatYN,
  session,
}: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2"
    >
      {!isCollapsed && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={link.id}>
              <Tooltip key={link.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <LinkCollapsed
                    chatYN={chatYN}
                    session={session}
                    link={link}
                  ></LinkCollapsed>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Links
              // index={link.id}
              key={link.id}
              link={link}
              chatYN={chatYN}
              session={session}
            />
          ),
        )}
      </nav>
    </div>
  );
}
