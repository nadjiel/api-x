import { Router } from "express";

import { errorCatcher } from "../middleware";
import { userController } from "../controllers";

const router = Router();

router.get("/", errorCatcher(userController.getAll));
router.get("/:id", errorCatcher(userController.get));
router.post("/", errorCatcher(userController.create));
router.put("/:id", errorCatcher(userController.update));
router.delete("/:id", errorCatcher(userController.remove));

export default router;
