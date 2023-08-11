import express from "express";
import * as ctrl from "../../controllers/contacts/index.js";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { schemasContact } from "../../models/index.js";

const router = express.Router();

router.get("/", authenticate, ctrl.getListContacts);

router.get("/:contactId", authenticate, ctrl.getContacts);

router.post("/", authenticate, ctrl.postAddContact);

router.delete("/:contactId", authenticate, ctrl.deleteContact);

router.put("/:contactId", authenticate, ctrl.putUpdateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemasContact.updateFavoriteSchema),
  ctrl.patchUpdateStatusContact
);

export default router;
