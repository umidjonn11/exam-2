import express from "express";
import { connectDB } from "./config/db.js";
import {apiRouter} from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config();

// import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const port = process.env.PORT || 1010;

app.use(express.json());

connectDB();

app.use((req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
  });
  next();
});

app.use("/api",apiRouter)
// app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port : http://localhost:${port}`);
});
