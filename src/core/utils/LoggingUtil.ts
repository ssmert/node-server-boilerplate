import { Request, Response, NextFunction } from "express";
import winston from 'winston';

export function logger(winstonInstance: any) {
    winstonInstance.configure({
        level: (process.env.PROFILE) === "dev" ? 'debug' : 'info',
        transports: [
            //
            // - Write all logs error (and below) to `error.log`.
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            //
            // - Write to all logs with specified level to console.
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });

    return async (req: Request, res: Response, next: NextFunction) => {

        const start = new Date().getTime();

        await next();

        const ms = new Date().getTime() - start;

        let logLevel: string;
        if (res.statusCode >= 500) {
            logLevel = 'error';
        } else if (res.statusCode >= 400) {
            logLevel = 'warn';
        } else if (res.statusCode >= 100) {
            logLevel = 'info';
        }

        const msg: string = `${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`;

        winstonInstance.log(logLevel, msg);
    };
}
