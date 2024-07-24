"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { cn } from "~/lib/utils";
import Sidebar from "../sidebar";
import { Chat } from "~/components/chat/chat";
import { Message, UserChatData } from "~/server/actions";
import { Session } from "next-auth";

type ChatLayoutProps = {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  // currentUserId?: string;
  currentUserData: UserChatData;
  chatYN: boolean;
  // loggedInUserId: string;
  loggedInUserData: UserChatData[];
  session: Session | null;
  strippedLoggedInUserData: { id: string; name: string; avatar: string };
};
export type LinkProperties = {
  id: string;
  name: string;
  messages: Message[];
  avatar: string;
  variant: "grey" | "ghost";
};
export default function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  currentUserData,
  chatYN,
  loggedInUserData,
  session,
  strippedLoggedInUserData,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  // const [selectedUser, setSelectedUser] = React.useState<UserChatData>({
  //   id: "",
  //   avatar: "",
  //   messages: [],
  //   name: "",
  // });
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<UserChatData[]>([]);
  // const [clinks, setClinks] = useState<LinkProperties[]>([]);

  // useEffect(() => {
  //   const allData = async () => {
  //     // console.log({ loggedInUserId: loggedInUserId });
  //     // console.log({ currentUserId: currentUserId });
  //     // console.log({ data: data });
  //     // console.log({ chatYN: chatYN });
  //     setData(data);
  //   };
  //   // const firstData = async () => {
  //   //   // console.log({ loggedInUserId: loggedInUserId });
  //   //   await getUserChatDataById(currentUserId!).then((selectedUser) => {
  //   //     console.log({ selectedUser: selectedUser });
  //   //     setSelectedUser(selectedUser);
  //   //   });
  //   // };
  //   // firstData();
  //   allData();
  // }, []);

  // const selectedUser = await firstData();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]",
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          links={loggedInUserData.map((user) => {
            if (user.name === currentUserData.name) {
            }
            return {
              id: user.id,
              name: user.name,
              messages: user.messages ?? [],
              avatar: user.avatar,
              variant: currentUserData.name === user.name ? "grey" : "ghost",
            };
          })}
          isMobile={isMobile}
          chatYN={chatYN}
          session={session}
          // strippedLoggedInUserData={strippedLoggedInUserData}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {chatYN && (
          <Chat
            messages={currentUserData.messages}
            selectedUser={currentUserData}
            isMobile={isMobile}
            session={session}
            strippedLoggedInUserData={strippedLoggedInUserData}
          />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
