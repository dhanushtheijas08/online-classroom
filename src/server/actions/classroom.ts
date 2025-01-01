"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/db";
import { classroomSchema } from "@/schema/schema";
import { generateUniqueCode } from "@/lib/server-utils";
import { z } from "zod";

type ActionResponse = {
  status: "success" | "error";
  message: string;
  classroomCode?: string;
};

const verifyUserStatus = async (
  userId: string,
  userRole: "TEACHER" | "STUDENT"
): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        emailVerified: true,
      },
    });

    return Boolean(user && user.role === userRole && user.emailVerified);
  } catch (error) {
    console.error("Error verifying teacher status:", error);
    return false;
  }
};

export const createClassroom = actionClient
  .schema(classroomSchema)
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: headers(),
      });

      if (!session?.user?.id) {
        return {
          status: "error",
          message: "Authentication required",
        };
      }

      const userId = session.user.id;
      const isVerifiedTeacher = await verifyUserStatus(userId, "TEACHER");

      if (!isVerifiedTeacher) {
        return {
          status: "error",
          message: "Only verified teachers can create classrooms",
        };
      }

      const { name, classType, subject, classroomImage, maxStudents, tags } =
        parsedInput;

      if (classType === "private" && !maxStudents) {
        return {
          status: "error",
          message: "Max Students Required for private classroom",
        };
      }

      const classroom = await prisma.classroom.create({
        data: {
          name,
          classroomType: classType.toUpperCase() as "PUBLIC" | "PRIVATE",
          classroomProfile: classroomImage,
          classroomCode: generateUniqueCode(6),
          classroomSubject: subject,
          maxStudents: maxStudents || null,
          teacher: {
            connect: {
              id: userId,
            },
          },
          tags: tags?.length
            ? {
                create: tags.map((tagName) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tagName },
                      create: { name: tagName },
                    },
                  },
                })),
              }
            : undefined,
        },
        select: {
          classroomCode: true,
          name: true,
          teacher: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: `Classroom "${classroom.name}" created successfully`,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          status: "error",
          message: "Invalid input data: " + error.errors[0]?.message,
        };
      }

      return {
        status: "error",
        message: "Failed to create classroom. Please try again later.",
      };
    }
  });
