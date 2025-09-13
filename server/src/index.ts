import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importamos las rutas
import searchRouter from "./routes/search";
import reviewsRouter from "./routes/reviews";
import analyticsRouter from "./routes/analytics";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint simple de salud
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Rutas principales
app.use("/api/search", searchRouter);
app.use("/api", reviewsRouter);
app.use("/api/analytics", analyticsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
