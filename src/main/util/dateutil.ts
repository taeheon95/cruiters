import { DateTime } from "luxon";

const datePattern =
  /^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-30|(?:0[13578]|1[02])-31)$/;

function validateDate(dateString: string) {
  return DateTime.fromFormat(dateString, "yyyy-LL-dd").isValid;
}

export { datePattern, validateDate };
