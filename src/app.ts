import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import errorHandler from "./main/middlewares/errorhandler";
import UserModule from "./main/user/User.module";

const app: Express = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("test");
});
UserModule(app, prisma);

export default app;
