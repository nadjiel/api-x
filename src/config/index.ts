import dotenv from "dotenv";

dotenv.config({
  path: `./env/.env.${ process.env.NODE_ENV }`
});
