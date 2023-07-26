import express from "express";
const router = express.Router();

import {
  authenticate,
  controllerWrapper,
  validation,
} from "../../middlewares/index.js";

import {
  joiContactSchema,
  updateContactStatusSchema,
} from "../../models/contacts.js";

import * as ctrl from "../../controllers/contacts/index.js";

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(updateContactStatusSchema),
  controllerWrapper(ctrl.updateContactStatus)
);

export default router;
