import express from "express";
import contactsController from "../../controllers/contacts.js";

import { validateBody } from "../../middlewares/index.js";
import contactAddSchema from "../../schemas/contacts.js";

const router = express.Router();

router.get("/", contactsController.listContacts);
router.get("/:id", contactsController.getContactById);
router.post(
  "/",
  validateBody(contactAddSchema.contactAddSchema),
  contactsController.addContact
);
router.put(
  "/:id",
  validateBody(contactAddSchema.contactAddSchema),
  contactsController.updateContactById
);
router.patch(
  "/:id/favorite",
  validateBody(contactAddSchema.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);
router.delete("/:id", contactsController.deleteContactById);

export default router;
