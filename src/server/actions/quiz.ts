"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { quizSchema } from "@/schema/schema";
import { headers } from "next/headers";
import { z } from "zod";

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
export const createQuiz = actionClient
  .schema(quizSchema.and(z.object({ classId: z.string() })))
  .action(async ({ parsedInput }) => {
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

      const {
        title,
        totalDuration,
        durationPerQuestion,
        questions,
        classId,
        startDate,
        endDate,
      } = parsedInput;

      await prisma.quiz.create({
        data: {
          title,
          totalDuration,
          classId: classId,
          durationPerQuestion,
          teacherId: userId,
          startsAt: startDate,
          endsAt: endDate,
          questions: {
            createMany: {
              data: questions.map((question) => ({
                content: question.content,
                questionType: question.questionType,
                options: question.options,
                correctAnswer: question.correctAnswer,
                points: question.points,
              })),
            },
          },
        },
      });

      return {
        status: "success",
        message: "Quiz created successfully",
      };
    } catch (error) {
      console.error("Error creating quiz:", error);
      return {
        status: "error",
        message: "An error occurred while creating the quiz",
      };
    }
  });
