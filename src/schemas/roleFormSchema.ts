import { z } from "zod";
import { requiredString } from "./common";

export const roleFormSchema = z.object({
  name: requiredString("Name is required"),
});

export type RoleType = z.infer<typeof roleFormSchema>;
