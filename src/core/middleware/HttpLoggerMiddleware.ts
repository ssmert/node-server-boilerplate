import { Request, Response, NextFunction } from "express";

// Like morgan
const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.info(`Request ::: [${req.method}] ${req.originalUrl}`);
    const start = new Date().getTime();
    res.on("finish", () => {
        const elapsed = new Date().getTime() - start;
        console.info(`Response ::: [${req.method}] ${req.originalUrl} Code : ${res.statusCode} Time : ${elapsed / 1000}(sec)`);
    });
    next();
};

export { requestLoggerMiddleware };