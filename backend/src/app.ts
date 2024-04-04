import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from 'path';

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./json/swagger_output.json";


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

// Routes
import classRoutes from "./routes/class.routes"
import teacherRoutes from "./routes/teachers.routes"
import studentRoutes from "./routes/students.routes"

app.use("/api/v1/class", classRoutes)
app.use("/api/v1/teacher", teacherRoutes)
app.use("/api/v1/student", studentRoutes)




const options = { explorer: true, }
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput, options));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
})

export { app };