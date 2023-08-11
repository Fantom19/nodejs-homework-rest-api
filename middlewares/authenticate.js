import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "";
import { User } from "../models/users.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization) {
    next(HttpError(401, "Not authorized 1"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized 2"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "Not authorized 3"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized 4"));
  }
};

export default authenticate;
