import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../prisma/generated/prisma/client";

const errorHandler = (error: any, req: Request, res: Response, next : NextFunction)=>{
            if(res.headersSent){
                return next(error)
            }

            let statusCode: number = 500;
            let errorMessage = "Internal Server Error";
            let errorDetails = error;

            if(error instanceof Prisma.PrismaClientValidationError){
                statusCode = 400;
        errorMessage = "You provide incorrect field type or missing fields";
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            statusCode = 400;
            errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}"
        } else if (error.code === "P2002") {
            statusCode = 400;
            errorMessage = "Duplicate Key found"
        } else if (error.code === "P2003") {
            statusCode = 400;
            errorMessage = "Foreign key contraint error"
         }
    }
    else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = 'Error occured during query execution'
    }
    else if (error instanceof Prisma.PrismaClientInitializationError) {
        if (error.errorCode === 'P1000') {
            statusCode = 401;
            errorMessage = "Authentication failed. Please check your credentails"
        } else if (error.errorCode === 'P1001') {
            statusCode = 400;
            errorMessage = "Can't reach to database."
        }
    }
  res.status(statusCode).json({
    statusCode,
    message: errorMessage,
    error: errorDetails
  })
}

export default errorHandler;