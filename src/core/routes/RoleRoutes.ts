import Router from "express";
import RoleController from "../../role/api/RoleController";

const router = Router();
const ctrl = new RoleController();

router.route("/")
    .get(ctrl.getList)
    .post(ctrl.register);

router.route("/:id")
    .get(ctrl.get)
    .put(ctrl.update)
    .delete(ctrl.delete);

export default router;