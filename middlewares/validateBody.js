import { HttpError } from "../helpers/index.js";

const validateBody = (contactAddSchema) => {
  const func = ({ body }, _, next) => {
    const { error } = contactAddSchema.validate(body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
