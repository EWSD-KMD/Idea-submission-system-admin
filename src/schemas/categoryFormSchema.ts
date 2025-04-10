import { z } from "zod";
import { requiredString } from "./common";

export const categoryFormSchema = z.object({
 name: requiredString("Name is required"),
});

export type CategoryType = z.infer<typeof categoryFormSchema>;
