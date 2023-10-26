import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(PORT, () => console.log(
  `Listening on port ${ PORT }`
));
