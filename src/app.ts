import "./config";

import express from "express";
import morgan from "morgan";
import httpStatus from "http-status-codes";

import { userRouter } from "./routes";
import Exception from "./error/Exception";
import { errorHandler } from "./middleware";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter)

app.all("*", (req, res, next) => {
  const error = new Exception(
    "Not found",
    `Can't find '${req.originalUrl}' route`,
    httpStatus.NOT_FOUND
  );

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(
  `Listening on port ${ PORT }`
));
