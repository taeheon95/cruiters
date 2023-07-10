import express, { Express, NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorhandler";
import UserModule from "./user/User.module";

const app: Express = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(errorHandler);
UserModule(app, prisma);

export default app;
