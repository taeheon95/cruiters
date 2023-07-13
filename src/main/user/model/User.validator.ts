import Joi from "joi";
import { UserError } from "../../exception/UserError";
import { validate } from "../../common/Validator";
import { UserInputModel, UserModel } from "./User";

const userModelDefaultSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

export const userModelValidater = validate<UserModel>(
  userModelDefaultSchema,
  (error) => {
    throw new UserError("");
  }
);

export const userInputModelValidater = validate<UserInputModel>(
  userModelDefaultSchema,
  (error) => {
    throw new UserError("");
  }
);
