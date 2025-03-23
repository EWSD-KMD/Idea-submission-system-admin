import { z } from "zod";
import { requiredString } from "./common";

export const loginSchema = z.object({
  email: requiredString("Email is required"),
  password: requiredString("Password is required"),
});

export type LoginType = z.infer<typeof loginSchema>;
