import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { envVars } from './config/env';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true
  }
))

// parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to PrepHive Server",
    environment: envVars.NODE_ENV,
    uptime: process.uptime().toFixed(2) + " sec",
    timestamp: new Date().toISOString()
  })
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;