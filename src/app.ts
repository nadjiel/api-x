import "./config";

import express from "express";
import morgan from "morgan";

import router from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router)
app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(PORT, () => console.log(
  `Listening on port ${ PORT }`
));
