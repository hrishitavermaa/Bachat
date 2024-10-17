import { Router } from "express";
import middlware from "../middlewares/user";
import controller from "../controllers/transaction";

const router = Router();

router.use(middlware);

router.route("/add").post(controller.add);
router.route("/:id").delete(controller.delete);
router.route("/all").get(controller.fetchAll);
router.route("/:id").get(controller.fetchById);

export default router;
