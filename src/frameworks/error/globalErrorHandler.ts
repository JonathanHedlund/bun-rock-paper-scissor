import { AppError } from "../../shared/appError";

import type { Request, Response, NextFunction } from "express";

const sendErrorDev = function (err: AppError, res: Response) {
	res.status(err.statusCode).json({
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = function (err: AppError, res: Response) {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		console.log("ERROR", err);

		res.status(500).json({ message: "Something went wrong! 💥" });
	}
};

export const globalErrorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	if (Bun.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	}

	if (Bun.env.NODE_ENV === "production") {
		sendErrorProd(err, res);
	}
};
