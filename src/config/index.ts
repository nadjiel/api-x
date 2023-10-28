import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

dotenv.config({
  path: `./env/.env.${ process.env.NODE_ENV }`
});
