import { Request, Response } from "express";
import { NOT_FOUND, getStatusText } from "http-status-codes";

export function index(req: Request, res: Response): Response {
    return res.status(NOT_FOUND).send(getStatusText(NOT_FOUND));
}