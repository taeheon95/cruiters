import Joi from "joi";
import { datePattern, validateDate } from "../../../util/dateutil";
import { DateTime } from "luxon";

interface UserSearch {
  name?: string;
  countryNumber?: string;
  contact?: string;
  email?: string;
  address?: string;
  birthDateStart?: string;
  birthDateEnd?: string;
  createAtStart?: string;
  createAtEnd?: string;
  updateAtStart?: string;
  updateAtEnd?: string;
}

const userSearchSchema = Joi.object({
  name: Joi.string(),
  countryNumber: Joi.string(),
  contact: Joi.string(),
  email: Joi.string(),
  address: Joi.string(),
  birthDateStart: Joi.string().pattern(datePattern),
  birthDateEnd: Joi.string().pattern(datePattern),
  createAtStart: Joi.string().pattern(datePattern),
  createAtEnd: Joi.string().pattern(datePattern),
  updateAtStart: Joi.string().pattern(datePattern),
  updateAtEnd: Joi.string().pattern(datePattern),
});

const validateUserSearchSchema = async (instance: unknown) => {
  const checkResult = await userSearchSchema.validate(instance);
  if (checkResult.error) {
  }
  const searchValue: UserSearch = checkResult.value;
  searchValue.birthDateStart &&
    !validateDate(searchValue.birthDateStart) &&
    (() => {});

  if (searchValue.birthDateStart) {
    DateTime.fromFormat(searchValue.birthDateStart, "yyyy-LL-dd").isValid ===
      false;
  }
};

export { validateUserSearchSchema };
