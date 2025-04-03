import { z } from "zod";
import { requiredNumber, requiredString } from "./common";

export const permissionFormSchema = z.object({
  operation: requiredString("operation is required"),
  menuId: requiredNumber("Action is required")
});

export type PermissionType = z.infer<typeof permissionFormSchema>;
