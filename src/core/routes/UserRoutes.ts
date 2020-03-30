import Router from "express";
import UserController from "../../user/api/UserController";

const router = Router();
const ctrl = new UserController();

router.route("/")
    .get(ctrl.getList)
    .post(ctrl.register);

router.route("/:id")
    .get(ctrl.get)
    .put(ctrl.update)
    .delete(ctrl.delete);

export default router;