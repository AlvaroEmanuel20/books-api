import ApiError from "@lib/ApiError";
import { NextFunction, Request, Response } from "express";

const errors = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message,
            code: error.status,
        });
    }

    res.status(500).json({
        message: "Internal server error",
        code: 500,
    });

    next(error);
};

export default errors;
