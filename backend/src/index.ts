import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
import connectDb from "./db/db";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import { shareRoutes, publicShareRoutes } from "./routes/shareRoutes";

dotenv.config();
connectDb();

app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Public routes (no authentication required)
app.use("/api/v1", publicShareRoutes);

// Protected routes (authentication required)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contents", contentRoutes);
app.use("/api/v1", shareRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running with TypeScript...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
