import AiChat from "@/components/chat/chatForm";
import MessageList from "@/components/chat/message-list";
import PdfViewer from "@/components/pdf-viewer";
import prisma from "@/lib/db";

export default async function Chat({
  params,
  searchParams,
}: {
  params: { chatId: string };
  searchParams: { classroomId: string };
}) {
  const chat = await prisma.chat.findUnique({ where: { id: params.chatId } });

  return (
    <div className="flex flex-col h-scree p-4 mr-5 relative w-full h-screen">
      <h1 className="text-2xl font-bold mb-4">AI Chat Interface</h1>

      {chat?.pdfUrl && chat?.pdfName && (
        <PdfViewer pdfUrl={chat?.pdfUrl!} pdfName={chat?.pdfName!} />
      )}

      <AiChat chatId={params.chatId} />
    </div>
  );
}
