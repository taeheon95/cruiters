import Joi from "joi";
import { UserError } from "../../exception/UserError";
import { Validator } from "../../common/Validator";
import { UserInputModel, UserModel } from "./User";

const userModelDefaultSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

export class UserModelValidator extends Validator<UserModel> {
  constructor() {
    super(userModelDefaultSchema);
  }
  onError(error: Joi.ValidationError): void {
    throw new UserError("");
  }
}

export class UserInputModelValidator extends Validator<UserInputModel> {
  constructor() {
    super(userModelDefaultSchema);
  }
  onError(error: Joi.ValidationError): void {
    throw new UserError("");
  }
}
