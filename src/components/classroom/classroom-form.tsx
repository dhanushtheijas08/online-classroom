"use client";

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

import { UploadDropzone } from "@/lib/uploadthing";
import { classroomSchema } from "@/schema/schema";
import { ClassroomType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SpinnerButton from "../spinner-button";
import TagInput from "./tag-input";

export function ClassroomForm({
  onSubmit,
  status,
}: {
  onSubmit: (values: ClassroomType) => void;
  status: "executing" | "hasSucceeded" | "hasErrored" | "idle";
}) {
  const form = useForm<ClassroomType>({
    resolver: zodResolver(classroomSchema),
  });

  const classroomType = form.watch("classType");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-2 md:px-0  flex flex-col gap-y-2.5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Mathematics 101"
                  className="text-base"
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={status === "executing"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter subject"
                  className="text-base"
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {classroomType === "private" && (
          <FormField
            control={form.control}
            name="maxStudents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Students</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Max students (required for private)"
                    className="text-base"
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {classroomType === "public" && (
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classroom Tags</FormLabel>
                <FormControl>
                  <TagInput onValueChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This help your classroom to be discovered by students
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <UploadDropzone
          endpoint="imageUploader"
          className="border border-dashed"
          appearance={{
            button: {
              // display: "none",
            },
            label: {
              // color: "green",
            },
          }}
          onClientUploadComplete={(res) => {
            form.setValue("classroomImage", res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

        <SpinnerButton
          type="submit"
          disabled={status === "executing"}
          disabledText="Submitting..."
          className="w-full lg:mt-1.5 mb-1.5"
        >
          Submit
        </SpinnerButton>
      </form>
    </Form>
  );
}
