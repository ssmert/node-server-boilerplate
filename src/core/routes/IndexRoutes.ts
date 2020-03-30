import Router from "express";
import { index } from "../api/IndexController";

const router = Router();

router.route("/").get(index);

export default router;