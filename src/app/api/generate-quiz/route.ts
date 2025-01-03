import prisma from "@/lib/db";
import { pineconeSplitter } from "@/lib/pinecone";

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = await pineconeSplitter(body.fileContent);
  await prisma.chat.create({
    data: {
      id: data,
      pdfName: body.fileName,
      pdfUrl: body.uploadedFile,
      createdAt: new Date(),
      userId: body.userId,
    },
  });
  return Response.json({ id: data });
};
