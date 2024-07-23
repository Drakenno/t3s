"use client";
import { Message, messageDbPush, UserChatData } from "~/server/actions";
import ChatTopbar from "~/components/chat/chat-topbar";
import { ChatList } from "~/components/chat/chat-list";
import React from "react";
import { Session } from "next-auth";

type ChatProps = {
  messages?: Message[];
  selectedUser: UserChatData;
  isMobile: boolean;
  session: Session | null;
  strippedLoggedInUserData: { id: string; name: string; avatar: string };
};

export function Chat({
  messages,
  selectedUser,
  isMobile,
  session,
  strippedLoggedInUserData,
}: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages?.sort((a, b) => a.id - b.id) ?? [],
  );
  console.log({
    messages: messages,
    selectedUser: selectedUser,
    strippedLoggedInUserData: strippedLoggedInUserData,
  });
  const sendMessage = async (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
    await messageDbPush(newMessage, session?.user.id, selectedUser.id);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        strippedLoggedInUserData={strippedLoggedInUserData}
      />
    </div>
  );
}
