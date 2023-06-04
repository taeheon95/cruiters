import express, { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../types/Api";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse<unknown>>,
  next: NextFunction
) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: {
      ...err,
    },
  });
};

export default errorHandler;
