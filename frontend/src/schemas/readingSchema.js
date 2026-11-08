import { z } from "zod";
import { getTodayDateString } from "../utils/formatters";

export const readingSchema = z.object({
  date: z
    .string({ required_error: "Date is required." })
    .min(1, "Date is required.")
    .refine(
      (val) => {
        const todayStr = getTodayDateString();
        return val <= todayStr;
      },
      {
        message: "Date cannot be in the future.",
      }
    ),

  slot: z.enum(
    ["MORNING_FASTING", "AFTER_BREAKFAST", "AFTER_LUNCH", "AFTER_DINNER"],
    {
      errorMap: () => ({ message: "Please select a reading slot." }),
    }
  ),

  value: z
    .preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
      z
        .number({
          required_error: "Please enter a glucose value.",
          invalid_type_error: "Please enter a glucose value.",
        })
        .int({ message: "Value must be a whole number." })
        .min(40, { message: "Value must be between 40 and 600 mg/dl." })
        .max(600, { message: "Value must be between 40 and 600 mg/dl." })
    ),
});

