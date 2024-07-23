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
};

export function Chat({ messages, selectedUser, isMobile, session }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? [],
  );

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
      />
    </div>
  );
}
