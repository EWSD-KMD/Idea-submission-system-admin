import { z } from "zod";
import { requiredString } from "./common";

export const menuFormSchema = z.object({
  name: requiredString("Name is required")
});

export type MenuType = z.infer<typeof menuFormSchema>;
