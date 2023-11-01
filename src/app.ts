import "./config";

import express from "express";
import morgan from "morgan";

import { userRouter } from "./routes";
import { defaultRouter, errorHandler } from "./middleware";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter)

app.all("*", defaultRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(
  `Listening on port ${ PORT }`
));
