import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import validateMiddleware from "./middleware/validate.middleware";
import CustomRouter from "./lib/routing/custom-router";

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://localhost:27017/test";

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("Could not connect to database", err))
  .then(() => console.log("Successfully connected to database"));

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(validateMiddleware);
const router = new CustomRouter(app);
routes(router);
const server = app.listen(PORT, () =>
  console.log("App listening on port", PORT)
);
