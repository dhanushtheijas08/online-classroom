"use client";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import MessageList from "./message-list";
import { ScrollArea } from "../ui/scroll-area";

export default function AiChat({ chatId }: { chatId: string }) {
  const { handleInputChange, input, handleSubmit, messages, isLoading } =
    useChat({
      api: "/api/chat",
      body: {
        chatId,
      },
    });

  return (
    <ScrollArea className="relative h-full">
      <MessageList isLoading={false} messages={messages} />

      <form className="absolute bottom-0 p-4 w-full" onSubmit={handleSubmit}>
        <Input value={input} onChange={handleInputChange} />
      </form>
    </ScrollArea>
  );
}
