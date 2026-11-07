import { Router } from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validations/auth.validation.js";
import { register } from "../controllers/auth.controller.js";
import { loginSchema } from "../validations/auth.validation.js";

import { login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
