import { z } from "zod";
import { requiredString } from "./common";

export const menuFormSchema = z.object({
  name: requiredString("Name is required"),
  permissions: requiredString("Permissions is required"),
});

export type MenuType = z.infer<typeof menuFormSchema>;
