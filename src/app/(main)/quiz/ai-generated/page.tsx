"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  Upload,
  Download,
  Share2,
  HelpCircle,
  Star,
} from "lucide-react";
import pdfToText from "react-pdftotext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadDropzone } from "@/lib/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// Define the schema for the form
const aiQuizSchema = z.object({
  questionStyle: z.enum(["formal", "casual", "academic", "Select a style"]),
  includeHints: z.boolean(),
  aiCreativityLevel: z.number().min(0).max(100),
  questionTypes: z.enum(["multiple-choice", "true-false", "short-answer"], {
    required_error: "Question type is required",
  }),
  difficultyLevel: z.enum(["easy", "medium", "hard"], {
    required_error: "Difficulty level is required",
  }),
  numberOfQuestions: z
    .number()
    .min(1, "At least 1 question is required")
    .max(100, "Maximum 100 questions allowed"),
  uploadedFile: z.string({ required_error: "File is required" }),
});

type AIQuizFormValues = z.infer<typeof aiQuizSchema>;

export default function PremiumAIQuizGeneratorPreview() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const classroomId = searchParams.get("classroomId");
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: AIQuizFormValues) => {
      const res = await axios.post("/api/generate-quiz", {
        ...data,
        fileContent,
        fileName,
        userId: "123",
      });
      if (res.data) {
        push(`/quiz/ai-generated/${res.data.id}?classroomId=${classroomId}`);
      }
    },
  });
  //

  const form = useForm<AIQuizFormValues>({
    resolver: zodResolver(aiQuizSchema),
    defaultValues: {
      questionStyle: "formal",
      includeHints: false,
      questionTypes: "multiple-choice",
      difficultyLevel: "medium",
      numberOfQuestions: 10,
      aiCreativityLevel: 50,
    },
  });
  async function extractText(pdf_url: string) {
    if (!pdf_url) return;
    const file = await fetch(pdf_url);
    let res = await file.blob();
    pdfToText(res).then((text) => setFileContent(text));
  }
  const onSubmit = (data: AIQuizFormValues) => {
    // console.log(JSON.stringify({ ...data, fileContent }));
    mutate(data);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">AI Quiz Generation Preview</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <FormField
                control={form.control}
                name="uploadedFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Upload</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={(e) => {
                            handleFileUpload(e);
                            field.onChange(e.target.files?.[0] || null);
                          }}
                        />
                      </div>
                    </FormControl>
                    {error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <UploadDropzone
                endpoint="imageUploader"
                className="border border-dashed"
                onClientUploadComplete={(res) => {
                  form.setValue("uploadedFile", res[0]?.url);
                  setFileName(res[0]?.name);
                  extractText(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />

              {fileContent && (
                <div className="border rounded-md p-4">
                  <p>{fileContent}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between gap-5">
            {/* AI Settings */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>AI Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="questionStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Style</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeHints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Include Hints</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aiCreativityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Creativity Level</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Quiz Customization */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Quiz Customization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Question Types */}
                <FormField
                  control={form.control}
                  name="questionTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Types</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select question types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value="true-false">
                              True/False
                            </SelectItem>
                            <SelectItem value="short-answer">
                              Short Answer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Difficulty Level */}
                <FormField
                  control={form.control}
                  name="difficultyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Questions */}
                <FormField
                  control={form.control}
                  name="numberOfQuestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of questions"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? parseInt(e.target.value, 10) : 1
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Generated Quiz Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p>
                  {fileContent
                    ? `Previewing content for file: ${fileContent}`
                    : "No content available. Please upload a file to preview."}
                </p>
              </ScrollArea>
            </CardContent>
          </Card> */}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit">Generate Quiz</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// export default function PremiumAIQuizGeneratorLayout() {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isQuizGenerated, setIsQuizGenerated] = useState(false);
//   const [fileData, setFileDate] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const handleGenerate = () => {};

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         setError("File size exceeds 10MB limit.");
//         return;
//       }
//       if (
//         ![
//           "application/pdf",
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//           "text/plain",
//         ].includes(file.type)
//       ) {
//         setError("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
//         return;
//       }

//       const fileData = await pdfToText(file);
//       setFileDate(fileData);
//       setError(null);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold mb-2">Premium AI Quiz Generator</h1>
//         <p className="text-muted-foreground">
//           Generate custom quizzes using AI based on your uploaded materials.
//         </p>
//       </div>

//       <FileUpload error={error} onFileUpload={handleFileUpload} />
//       <ContentPreview content={fileData} />

//       <div className="grid gap-6 md:grid-cols-2">
//         <QuizCustomizationOptions />
//         <AISettings />
//       </div>

//       <div className="text-center">
//         <Button onClick={handleGenerate} disabled={isGenerating}>
//           {isGenerating ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generating Quiz...
//             </>
//           ) : (
//             "Generate Quiz"
//           )}
//         </Button>
//       </div>

//       {isQuizGenerated && (
//         <>
//           <GeneratedQuizReview />

//           <div className="flex justify-between">
//             <div className="space-x-2">
//               <Button variant="outline">
//                 <Download className="mr-2 h-4 w-4" />
//                 Download PDF
//               </Button>
//               <Button variant="outline">
//                 <Share2 className="mr-2 h-4 w-4" />
//                 Share Quiz
//               </Button>
//             </div>
//             <Button>Save and Publish Quiz</Button>
//           </div>

//           <FeedbackSection />
//         </>
//       )}

//       <div className="flex justify-center">
//         <Button variant="link">
//           <HelpCircle className="mr-2 h-4 w-4" />
//           Need help? Check our FAQ or tutorials
//         </Button>
//       </div>
//     </div>
//   );
// }

// // Subcomponent: Quiz Customization Options
// function QuizCustomizationOptions() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Quiz Customization</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor="questionTypes">Question Types</Label>
//           <Select>
//             <SelectTrigger id="questionTypes">
//               <SelectValue placeholder="Select question types" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
//               <SelectItem value="true-false">True/False</SelectItem>
//               <SelectItem value="short-answer">Short Answer</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="difficultyLevel">Difficulty Level</Label>
//           <Select>
//             <SelectTrigger id="difficultyLevel">
//               <SelectValue placeholder="Select difficulty" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="easy">Easy</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="hard">Hard</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="numberOfQuestions">Number of Questions</Label>
//           <Input
//             type="number"
//             id="numberOfQuestions"
//             placeholder="Enter number of questions"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // Subcomponent: AI Settings
// function AISettings() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>AI Settings</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor="questionStyle">Question Style</Label>
//           <Select>
//             <SelectTrigger id="questionStyle">
//               <SelectValue placeholder="Select style" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="formal">Formal</SelectItem>
//               <SelectItem value="casual">Casual</SelectItem>
//               <SelectItem value="academic">Academic</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="includeHints">Include Hints</Label>
//           <Switch id="includeHints" />
//         </div>
//         <div>
//           <Label>AI Creativity Level</Label>
//           <Slider defaultValue={[50]} max={100} step={1} />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // Subcomponent: File Upload
// function FileUpload({
//   error,
//   onFileUpload,
// }: {
//   error: string | null;
//   onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Upload Materials</CardTitle>
//         <CardDescription>
//           Upload PDFs or other materials to generate quizzes from.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="border-2 border-dashed rounded-md p-6 text-center">
//           <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//           <p className="mt-2">
//             Drag and drop your files here, or click to select files
//           </p>
//           <p className="text-xs text-muted-foreground mt-1">
//             PDF, DOCX, TXT up to 10MB
//           </p>
//           <Button
//             className="mt-4"
//             onClick={() => document.getElementById("fileInput")?.click()}
//           >
//             Select Files
//           </Button>
//           <input
//             id="fileInput"
//             type="file"
//             className="hidden"
//             accept=".pdf,.docx,.txt"
//             onChange={onFileUpload}
//           />
//         </div>
//         {error && (
//           <Alert variant="destructive" className="mt-4">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // Subcomponent: Content Preview
// function ContentPreview({ content }: { content: string }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Content Preview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[200px] w-full rounded-md border p-4">
//           <p>{content || ""}</p>
//         </ScrollArea>
//         <Button className="mt-4">Highlight Key Sections</Button>
//       </CardContent>
//     </Card>
//   );
// }

// // Subcomponent: Generated Quiz Review
// function GeneratedQuizReview() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Generated Quiz Review</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[300px]">
//           {[1, 2, 3].map((questionNumber) => (
//             <div key={questionNumber} className="mb-4 p-4 border rounded">
//               <h3 className="font-bold mb-2">Question {questionNumber}</h3>
//               <p className="mb-2">What is the capital of France?</p>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`q${questionNumber}a`}
//                     name={`q${questionNumber}`}
//                     className="mr-2"
//                   />
//                   <label htmlFor={`q${questionNumber}a`}>`A) Paris`</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`q${questionNumber}b`}
//                     name={`q${questionNumber}`}
//                     className="mr-2"
//                   />
//                   <label htmlFor={`q${questionNumber}b`}>`B) London`</label>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// }
// // Subcomponent: Feedback Section
// function FeedbackSection() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Your Feedback</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Label htmlFor="feedback">Help us improve quiz generation</Label>
//         <Textarea
//           id="feedback"
//           placeholder="Share your feedback here"
//           className="mt-2"
//         />
//         <Button className="mt-4">
//           <Star className="mr-2 h-4 w-4" /> Submit Feedback
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
