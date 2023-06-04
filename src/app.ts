import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import resume from "./resume";
import errorHandler from "./middlewares/errorhandler";

const app = express();

app.use(bodyParser.json());
app.use(errorHandler);

app.use("/resume", resume);

app.post("/", (request: Request, response: Response) => {
  console.log(request.body);
  response.send(request.body.data);
});

export default app;
