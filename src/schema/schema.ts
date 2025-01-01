import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z.string().min(8, {
    message: "Password must 8 characters",
  }),
});

export const registerSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z.string().min(8, {
    message: "Password must 8 characters",
  }),
});
export const classroomSchema = z
  .object({
    name: z.string().min(1, { message: "Classroom name is required" }),

    classType: z.enum(["public", "private"]).default("public"),

    subject: z
      .string()
      .min(1, { message: "Subject is required" })
      .max(25, { message: "Subject must be 25 characters or less" }),

    maxStudents: z.coerce
      .number()
      .max(450, { message: "Maximum allowed students is 450" })
      .optional(),

    tags: z
      .string()
      .array()
      .max(3, { message: "A maximum of 3 tags are allowed" })
      .optional(),

    classroomImage: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.classType === "private") {
        return data.maxStudents !== undefined;
      }
      return true;
    },
    {
      message: "Max students is required for private classrooms",
      path: ["maxStudents"],
    }
  )
  .refine(
    (data) => {
      if (data.classType === "private" && data.maxStudents !== undefined) {
        return data.maxStudents <= 450;
      }
      return true;
    },
    {
      message: "Max students cannot exceed 450 for private classrooms",
      path: ["maxStudents"],
    }
  );

export const questionSchema = z.object({
  content: z.string().min(1, "Question content is required"),
  questionType: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER"]),
  options: z.array(z.string()).min(2, "At least two options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  points: z.number().min(1, "Points must be at least 1"),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  totalDuration: z
    .number()
    .min(1, "Total duration must be at least 1 minute")
    .nullable(),
  durationPerQuestion: z
    .number()
    .min(1, "Duration per question must be at least 1 second")
    .nullable(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  questions: z.array(questionSchema),
});
