import { z } from "zod";

export const requiredString = (errMessage = "this field is required") =>
  z
    .string({
      invalid_type_error: errMessage,
    })
    .min(1, { message: errMessage });

export const requiredNumber = (errMessage = "this field is require") =>
  z.number().min(1, { message: errMessage });

