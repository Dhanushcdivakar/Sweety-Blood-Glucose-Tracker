import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.js";
import {
  createReadingSchema,
  updateReadingSchema,
} from "../validations/reading.validation.js";
import {
  createReading,
  getReadings,
  updateReading,
  deleteReading,
} from "../controllers/reading.controller.js";

const router = Router();

router.post("/", authenticate, validate(createReadingSchema), createReading);
router.get("/", authenticate, getReadings);
router.put("/:id", authenticate, validate(updateReadingSchema), updateReading);

router.delete("/:id", authenticate, deleteReading);

export default router;
