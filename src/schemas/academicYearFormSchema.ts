import { z } from "zod";
import { requiredNumber, requiredString } from "./common";

export const acedamicYearFormSchema = z.object({
 year: requiredNumber("Year is required"),
 startDate: requiredString("Start Date is required"),
 closureDate: requiredString("Closure Date is required"),
 finalClosureDate: requiredString("Final Closure Date is required"),
});

export type AcademicYearType = z.infer<typeof acedamicYearFormSchema>;

