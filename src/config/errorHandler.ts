import { NextFunction, Request, Response } from "express";
import { CustomError } from "../domain/errors/custom.error";



export const errorHandler = async (error:any,req: Request, res: Response, next: NextFunction): Promise<any> => {

  if (error instanceof CustomError) {

    return res.status(error.statusCode).json({ error: error.message });
  }

  console.error("Unexpected error:", error);

  res.status(500).json({ error: "Internal Server Error" });
}