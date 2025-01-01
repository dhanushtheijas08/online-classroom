"use client";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-modal";
import { createClassroom } from "@/server/actions/classroom";
import { ClassroomType } from "@/types/types";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { ClassroomForm } from "./classroom-form";

const ClassroomModal = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { execute, status } = useAction(createClassroom, {
    onSuccess: ({ data }) => {
      if (!data) toast.error("Something went wrong");
      if (data?.status === "error") {
        toast.error(data.message);
      } else {
        toast.success(data?.message);
      }
      setIsModalOpen(false);
    },
  });

  function onSubmit(values: ClassroomType) {
    console.log("values", values);
    execute(values);
  }

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onOpenChange={(val) => setIsModalOpen(val)}
    >
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>New Classroom</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <ClassroomForm onSubmit={onSubmit} status={status} />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ClassroomModal;
