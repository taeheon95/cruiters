import Joi from "joi";

export abstract class Validator<T> {
  constructor(private readonly schema: Joi.ObjectSchema<T>) {}

  validate(instance: unknown): T {
    const validationResult = this.schema.validate(instance);
    if (validationResult.error) {
      this.onError(validationResult.error);
    }
    return validationResult.value as T;
  }

  abstract onError(error: Joi.ValidationError): void;
}

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export class NumberPipe extends Validator<number> {
  constructor() {
    super(idSchema);
  }

  onError(error: Joi.ValidationError): void {
    throw new Error("");
  }
}
