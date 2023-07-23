import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isValidId = ({ params }, _, next) => {
  const { id } = params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} not valid id`));
  }
  next();
};

export default isValidId;
