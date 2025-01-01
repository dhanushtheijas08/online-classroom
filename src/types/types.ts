import { z } from "zod";
import { classroomSchema, loginSchema, registerSchema } from "@/schema/schema";

export type Logintype = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
export type ClassroomType = z.infer<typeof classroomSchema>;
