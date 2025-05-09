import { z } from "zod";
import { requiredNumber, requiredString } from "./common";

export const userFormSchema = z.object({
  email: requiredString("Email is required"),
  name: requiredString("Name is required"),
  password: requiredString("Password is required"),
  roleId: z.number().optional(),
  departmentId: requiredNumber("DepartmentId is required"),
  type: requiredString("Type is required")
});

export type UserType = z.infer<typeof userFormSchema>;

export const userEditFormSchema = z.object({
  email: requiredString("Email is required"),
  name: requiredString("Name is required"),
  roleId: z.number().optional(),
  departmentId: requiredNumber("DepartmentId is required"),
  type: requiredString("Type is required")
});

export type EditUserType = z.infer<typeof userEditFormSchema>;


