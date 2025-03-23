import { z } from "zod";
import { requiredNumber, requiredString } from "./common";

export const userFormSchema = z.object({
  email: requiredString("Email is required"),
  name: requiredString("Name is required"),
  password: requiredString("Password is required"),
  roleId: requiredNumber("RoleId is required"),
  departmentId: requiredNumber("DepartmentId is required"),
  type: requiredString("Type is required")
});

export type UserType = z.infer<typeof userFormSchema>;
