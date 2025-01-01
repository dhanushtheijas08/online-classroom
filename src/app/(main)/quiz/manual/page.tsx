"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { quizSchema } from "@/schema/schema";
import { createQuiz } from "@/server/actions/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
type QuizFormValues = z.infer<typeof quizSchema>;

export default function QuizCreation() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classroomId");

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
    if (!classId) {
      toast.error("No classroom found");
      return;
    }

    execute({ ...data, classId: classId });
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

              <div className="flex justify-between gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            // initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
