import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import readingRoutes from "./routes/reading.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sweety API is running",
  });
});

export default app;
