import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const extractToken = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization


    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new Error("authentication invalid");
        // res.status(StatusCodes.UNAUTHORIZED).json(
        //     { msg: "authentication required" }

    }

    const token = authHeader.split(" ")[1]


    return token
}