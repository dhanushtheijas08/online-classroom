// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Loader2,
//   Upload,
//   Download,
//   Share2,
//   HelpCircle,
//   Star,
// } from "lucide-react";

// const QuizCustomizationOptions = () => (
//   <Card>
//     <CardHeader>
//       <CardTitle>Quiz Customization</CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       <div>
//         <Label htmlFor="questionTypes">Question Types</Label>
//         <Select>
//           <SelectTrigger id="questionTypes">
//             <SelectValue placeholder="Select question types" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
//             <SelectItem value="true-false">True/False</SelectItem>
//             <SelectItem value="short-answer">Short Answer</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <Label htmlFor="difficultyLevel">Difficulty Level</Label>
//         <Select>
//           <SelectTrigger id="difficultyLevel">
//             <SelectValue placeholder="Select difficulty" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="easy">Easy</SelectItem>
//             <SelectItem value="medium">Medium</SelectItem>
//             <SelectItem value="hard">Hard</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <Label htmlFor="numberOfQuestions">Number of Questions</Label>
//         <Input
//           type="number"
//           id="numberOfQuestions"
//           placeholder="Enter number of questions"
//         />
//       </div>
//     </CardContent>
//   </Card>
// );

// const AISettings = () => (
//   <Card>
//     <CardHeader>
//       <CardTitle>AI Settings</CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       <div>
//         <Label htmlFor="questionStyle">Question Style</Label>
//         <Select>
//           <SelectTrigger id="questionStyle">
//             <SelectValue placeholder="Select style" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="formal">Formal</SelectItem>
//             <SelectItem value="casual">Casual</SelectItem>
//             <SelectItem value="academic">Academic</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <Label htmlFor="includeHints">Include Hints</Label>
//         <Switch id="includeHints" />
//       </div>
//       <div>
//         <Label>AI Creativity Level</Label>
//         <Slider defaultValue={[50]} max={100} step={1} />
//       </div>
//     </CardContent>
//   </Card>
// );

// const GeneratedQuizReview = () => (
//   <Card>
//     <CardHeader>
//       <CardTitle>Generated Quiz Review</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <ScrollArea className="h-[300px]">
//         {[1, 2, 3].map((questionNumber) => (
//           <div key={questionNumber} className="mb-4 p-4 border rounded">
//             <h3 className="font-bold mb-2">Question {questionNumber}</h3>
//             <p className="mb-2">What is the capital of France?</p>
//             <div className="space-y-2">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id={`q${questionNumber}a`}
//                   name={`q${questionNumber}`}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`q${questionNumber}a`}>Paris</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id={`q${questionNumber}b`}
//                   name={`q${questionNumber}`}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`q${questionNumber}b`}>London</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id={`q${questionNumber}c`}
//                   name={`q${questionNumber}`}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`q${questionNumber}c`}>Berlin</label>
//               </div>
//             </div>
//             <Button variant="outline" size="sm" className="mt-2">
//               Edit Question
//             </Button>
//           </div>
//         ))}
//       </ScrollArea>
//     </CardContent>
//   </Card>
// );

// export default function PremiumAIQuizGeneratorLayout() {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isQuizGenerated, setIsQuizGenerated] = useState(false);

//   const handleGenerate = () => {
//     setIsGenerating(true);
//     // Simulating API call
//     setTimeout(() => {
//       setIsGenerating(false);
//       setIsQuizGenerated(true);
//     }, 3000);
//   };

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold mb-2">Premium AI Quiz Generator</h1>
//         <p className="text-muted-foreground">
//           Generate custom quizzes using AI based on your uploaded materials.
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Upload Materials</CardTitle>
//           <CardDescription>
//             Upload PDFs or other materials to generate quizzes from.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="border-2 border-dashed rounded-md p-6 text-center">
//             <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//             <p className="mt-2">
//               Drag and drop your files here, or click to select files
//             </p>
//             <p className="text-xs text-muted-foreground mt-1">
//               PDF, DOCX, TXT up to 10MB
//             </p>
//             <Button className="mt-4">Select Files</Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Content Preview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ScrollArea className="h-[200px] w-full rounded-md border p-4">
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
//               euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
//               vitae tincidunt nisl nunc euismod nunc.
//             </p>
//             {/* Add more content here */}
//           </ScrollArea>
//           <Button className="mt-4">Highlight Key Sections</Button>
//         </CardContent>
//       </Card>

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

//           <Card>
//             <CardHeader>
//               <CardTitle>Feedback</CardTitle>
//               <CardDescription>
//                 Help us improve our AI quiz generation
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <Label htmlFor="rating">Rate this quiz</Label>
//                 <div className="flex space-x-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       className="h-6 w-6 text-muted-foreground hover:text-yellow-400 cursor-pointer"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <Label htmlFor="feedback">Additional feedback</Label>
//                 <Textarea
//                   id="feedback"
//                   placeholder="Share your thoughts on the generated quiz"
//                 />
//               </div>
//               <Button className="mt-4">Submit Feedback</Button>
//             </CardContent>
//           </Card>
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function PremiumAIQuizGeneratorLayout() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isQuizGenerated, setIsQuizGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsQuizGenerated(true);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return;
      }
      if (
        ![
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(file.type)
      ) {
        setError("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
        return;
      }
      setError(null);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Premium AI Quiz Generator</h1>
        <p className="text-muted-foreground">
          Generate custom quizzes using AI based on your uploaded materials.
        </p>
      </div>

      <FileUpload error={error} onFileUpload={handleFileUpload} />
      <ContentPreview />

      <div className="grid gap-6 md:grid-cols-2">
        <QuizCustomizationOptions />
        <AISettings />
      </div>

      <div className="text-center">
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            "Generate Quiz"
          )}
        </Button>
      </div>

      {isQuizGenerated && (
        <>
          <GeneratedQuizReview />

          <div className="flex justify-between">
            <div className="space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Quiz
              </Button>
            </div>
            <Button>Save and Publish Quiz</Button>
          </div>

          <FeedbackSection />
        </>
      )}

      <div className="flex justify-center">
        <Button variant="link">
          <HelpCircle className="mr-2 h-4 w-4" />
          Need help? Check our FAQ or tutorials
        </Button>
      </div>
    </div>
  );
}

// Subcomponent: Quiz Customization Options
function QuizCustomizationOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="questionTypes">Question Types</Label>
          <Select>
            <SelectTrigger id="questionTypes">
              <SelectValue placeholder="Select question types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="difficultyLevel">Difficulty Level</Label>
          <Select>
            <SelectTrigger id="difficultyLevel">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="numberOfQuestions">Number of Questions</Label>
          <Input
            type="number"
            id="numberOfQuestions"
            placeholder="Enter number of questions"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Subcomponent: AI Settings
function AISettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="questionStyle">Question Style</Label>
          <Select>
            <SelectTrigger id="questionStyle">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="includeHints">Include Hints</Label>
          <Switch id="includeHints" />
        </div>
        <div>
          <Label>AI Creativity Level</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </CardContent>
    </Card>
  );
}

// Subcomponent: File Upload
function FileUpload({
  error,
  onFileUpload,
}: {
  error: string | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
            onChange={onFileUpload}
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
}

// Subcomponent: Content Preview
function ContentPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <p>you can write your content here</p>
        </ScrollArea>
        <Button className="mt-4">Highlight Key Sections</Button>
      </CardContent>
    </Card>
  );
}

// Subcomponent: Generated Quiz Review
function GeneratedQuizReview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Quiz Review</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {[1, 2, 3].map((questionNumber) => (
            <div key={questionNumber} className="mb-4 p-4 border rounded">
              <h3 className="font-bold mb-2">Question {questionNumber}</h3>
              <p className="mb-2">What is the capital of France?</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`q${questionNumber}a`}
                    name={`q${questionNumber}`}
                    className="mr-2"
                  />
                  <label htmlFor={`q${questionNumber}a`}>`A) Paris`</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`q${questionNumber}b`}
                    name={`q${questionNumber}`}
                    className="mr-2"
                  />
                  <label htmlFor={`q${questionNumber}b`}>`B) London`</label>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
// Subcomponent: Feedback Section
function FeedbackSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="feedback">Help us improve quiz generation</Label>
        <Textarea
          id="feedback"
          placeholder="Share your feedback here"
          className="mt-2"
        />
        <Button className="mt-4">
          <Star className="mr-2 h-4 w-4" /> Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
