import express from "express";
const router = express.Router();

import {
  controllerWrapper,
  validation,
  authenticate,
} from "../../middlewares/index.js";

import { joiUserSchema } from "../../models/user.js";
import * as ctrl from "../../controllers/auth/index.js";

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signUp)
);

router.post(
  "/signin",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signIn)
);

router.get("/signout", authenticate, controllerWrapper(ctrl.signOut));
router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

export default router;
