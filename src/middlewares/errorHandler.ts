import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong " })

}
