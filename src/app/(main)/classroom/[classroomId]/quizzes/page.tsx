// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { PlusCircle, Search } from "lucide-react";

// export default function QuizTabContent() {
//   const [quizzes, setQuizzes] = useState([
//     {
//       id: 1,
//       title: "Midterm Exam",
//       status: "Active",
//       dueDate: "2024-03-15",
//       submissions: 15,
//     },
//     {
//       id: 2,
//       title: "Chapter 3 Quiz",
//       status: "Completed",
//       dueDate: "2024-03-01",
//       submissions: 20,
//     },
//     {
//       id: 3,
//       title: "Final Project",
//       status: "Draft",
//       dueDate: "2024-04-30",
//       submissions: 0,
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredQuizzes = quizzes.filter((quiz) =>
//     quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="relative w-64">
//           <Search
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
//             size={18}
//           />
//           <Input
//             type="text"
//             placeholder="Search quizzes..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Button>
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Create New Quiz
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredQuizzes.map((quiz) => (
//           <Card key={quiz.id} className="dark:bg-gray-800">
//             <CardHeader>
//               <CardTitle className="text-lg">{quiz.title}</CardTitle>
//               <CardDescription>Due: {quiz.dueDate}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between">
//                 <Badge
//                   variant={
//                     quiz.status === "Active"
//                       ? "default"
//                       : quiz.status === "Completed"
//                       ? "secondary"
//                       : "outline"
//                   }
//                 >
//                   {quiz.status}
//                 </Badge>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {quiz.submissions} submissions
//                 </span>
//               </div>
//             </CardContent>
//             <CardFooter className="justify-between">
//               <Button variant="outline" size="sm">
//                 Edit
//               </Button>
//               <Button size="sm">View Results</Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {filteredQuizzes.length === 0 && (
//         <div className="text-center py-10">
//           <p className="text-gray-500 dark:text-gray-400">
//             No quizzes found. Try adjusting your search.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { questionSchema, quizSchema } from "@/schema/schema";
import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { createQuiz } from "@/server/actions/quiz";

type QuizFormValues = z.infer<typeof quizSchema>;

export default function QuizCreation() {
  const { classroomId } = useParams<{ classroomId: string }>();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      totalDuration: null,
      durationPerQuestion: null,
      questions: [
        {
          content: "",
          questionType: "MULTIPLE_CHOICE",
          options: ["", ""],
          correctAnswer: "",
          points: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  const { execute, status } = useAction(createQuiz, {
    onSuccess: ({ data }) => {
      console.log({ data });
      form.reset();
    },
  });

  const onSubmit = async (data: QuizFormValues) => {
    execute({ ...data, classId: classroomId });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter quiz title"
                        {...field}
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total duration"
                        {...field}
                        disabled={status === "executing"}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseInt(e.target.value, 10) : null // Use `null` instead of an empty string for clarity
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Leave blank for no time limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationPerQuestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration Per Question (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total duration"
                        {...field}
                        disabled={status === "executing"}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseInt(e.target.value, 10) : null
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Leave blank for no per-question time limit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Question {index + 1}</span>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={status === "executing"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`questions.${index}.content`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter question"
                          {...field}
                          disabled={status === "executing"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`questions.${index}.questionType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={status === "executing"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MULTIPLE_CHOICE">
                            Multiple Choice
                          </SelectItem>
                          <SelectItem value="TRUE_FALSE">True/False</SelectItem>
                          <SelectItem value="SHORT_ANSWER">
                            Short Answer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch(`questions.${index}.questionType`) !==
                  "SHORT_ANSWER" && (
                  <div className="space-y-2">
                    <FormLabel>Options</FormLabel>
                    {form
                      .watch(`questions.${index}.options`)
                      .map((_, optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`questions.${index}.options.${optionIndex}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    placeholder={`Option ${optionIndex + 1}`}
                                    {...field}
                                    disabled={status === "executing"}
                                  />
                                  {optionIndex > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      disabled={status === "executing"}
                                      onClick={() => {
                                        const currentOptions = form.getValues(
                                          `questions.${index}.options`
                                        );
                                        form.setValue(
                                          `questions.${index}.options`,
                                          currentOptions.filter(
                                            (_, i) => i !== optionIndex
                                          )
                                        );
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={status === "executing"}
                      onClick={() => {
                        const currentOptions = form.getValues(
                          `questions.${index}.options`
                        );
                        form.setValue(`questions.${index}.options`, [
                          ...currentOptions,
                          "",
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name={`questions.${index}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter correct answer"
                          {...field}
                          disabled={status === "executing"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`questions.${index}.points`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter points"
                          {...field}
                          disabled={status === "executing"}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <div className="flex flex-row gap-5 w-full items-center">
            <Button
              type="button"
              variant="outline"
              disabled={status === "executing"}
              onClick={() =>
                append({
                  content: "",
                  questionType: "MULTIPLE_CHOICE",
                  options: ["", ""],
                  correctAnswer: "",
                  points: 1,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>

            <Button type="submit" disabled={status === "executing"}>
              {status === "executing" ? "Creating Quiz..." : "Create Quiz"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
