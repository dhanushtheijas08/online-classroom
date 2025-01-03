"use clinet";
import { FileIcon } from "lucide-react";
import { Card } from "./ui/card";
import { useChat } from "ai/react";
import Link from "next/link";
type PdfViewerProps = {
  pdfUrl: string;
  pdfName: string;
};

const PdfViewer = ({ pdfUrl, pdfName }: PdfViewerProps) => {
  return (
    <Card className="max-w-fit" role="button" tabIndex={0}>
      <Link
        href={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        className="flex items-center gap-3 py-3 px-5 w-fit cursor-pointer hover:bg-accent transition-colors"
        target="_blank"
      >
        <div className="bg-secondary p-2 rounded-md">
          <FileIcon className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{pdfName}</p>
        </div>
      </Link>
    </Card>
  );
};

export default PdfViewer;
