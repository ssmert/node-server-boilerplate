import { NextFunction, Response } from "express";
import { MESSAGES } from "../const/MESSAGES";
import HttpError from "../error/HttpError";
import { IRequestWithToken } from "../interface/IRequestWithToken";

function get(req: IRequestWithToken, res: Response, next: NextFunction): void {
    const header = req.headers.authorization;

    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        req.token = bearer[1];
        return next();
    } else return next(new HttpError(400, MESSAGES.loginFail));
}

export { get };

