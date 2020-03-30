import Router from "express";
import { login } from "../api/AuthController";

const router = Router();

router.post("/", login);

export default router;