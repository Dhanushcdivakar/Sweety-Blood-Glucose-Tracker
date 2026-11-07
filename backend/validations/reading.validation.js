import Joi from "joi";

export const createReadingSchema = Joi.object({
  date: Joi.date().iso().required(),

  slot: Joi.string()
    .valid("MORNING_FASTING", "AFTER_BREAKFAST", "AFTER_LUNCH", "AFTER_DINNER")
    .required(),

  value: Joi.number().integer().min(40).max(600).required().messages({
    "any.required": "Please enter a glucose value.",
    "number.base": "Please enter a valid glucose value.",
    "number.integer": "Value must be a whole number.",
    "number.min": "Value must be between 40 and 600 mg/dl.",
    "number.max": "Value must be between 40 and 600 mg/dl.",
  }),
});

export const updateReadingSchema = Joi.object({
  date: Joi.date().iso(),
  slot: Joi.string().valid(
    "MORNING_FASTING",
    "AFTER_BREAKFAST",
    "AFTER_LUNCH",
    "AFTER_DINNER",
  ),
  value: Joi.number().integer().min(40).max(600).messages({
    "number.min": "Value must be between 40 and 600 mg/dl.",
    "number.max": "Value must be between 40 and 600 mg/dl.",
    "number.integer": "Value must be a whole number.",
  }),
}).min(1);
