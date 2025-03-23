import { z } from "zod";
import { requiredString } from "./common";

export const departmentFormSchema = z.object({
 name: requiredString("Name is required"),
});

export type DepartmentType = z.infer<typeof departmentFormSchema>;
