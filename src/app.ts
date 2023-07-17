import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import errorHandler from "./main/middlewares/errorhandler";
import UserModule from "./main/user/User.module";

const app: Express = express();
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

app.use(bodyParser.json());
app.use(errorHandler);
UserModule(app, prisma);

export default app;
