"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const FileUpload = () => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 10MB limit.");
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
        return;
      }
      // Process the file...
      setError(null); // Clear error on successful validation
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Materials</CardTitle>
        <CardDescription>
          Upload PDFs or other materials to generate quizzes from.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed rounded-md p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2">
            Drag and drop your files here, or click to select files
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, DOCX, TXT up to 10MB
          </p>
          <Button
            className="mt-4"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Select Files
          </Button>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
          />
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
