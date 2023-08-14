import express from "express";
const router = express.Router();

import * as ctrl from "../../controllers/users/index.js";
import { validateBody, authenticate, upload } from "../../middlewares/index.js";
import { wrapper } from "../../helpers/index.js";
import { schemasUsers } from "../../models/index.js";

router.post(
  "/register",
  validateBody(schemasUsers.joiRegisterSchema),
  wrapper(ctrl.register)
);

router.get("/verify/:verificationToken", wrapper(ctrl.verifyEmail));

router.post("/verify", wrapper(ctrl.resendVerifyEmail));

router.post(
  "/login",
  validateBody(schemasUsers.joiLoginSchema),
  wrapper(ctrl.login)
);

router.get("/current", authenticate, wrapper(ctrl.current));

router.post("/logout", authenticate, wrapper(ctrl.logout));

router.patch("/update", authenticate, wrapper(ctrl.updateSubscription));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  wrapper(ctrl.updateAvatar)
);

export default router;
