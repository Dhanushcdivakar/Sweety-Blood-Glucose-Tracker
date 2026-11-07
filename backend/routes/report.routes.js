import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { getReports } from "../controllers/report.controller.js";

const router = Router();

router.get("/", authenticate, getReports);

export default router;
