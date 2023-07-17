import Joi from "joi";

export const validate =
  <T>(
    schema: Joi.ObjectSchema,
    onError: (error: Joi.ValidationError) => void,
  ) =>
  (instance: unknown) => {
    const result = schema.validate(instance);
    if (result.error) {
      onError(result.error);
    }
    return result.value as T;
  };

const numberPipeSchema = (key: string) =>
  Joi.object({
    [key]: Joi.number().integer().required(),
  });

export const numberPipe = (key: string, instance: unknown) =>
  validate<{ [key: string]: number }>(numberPipeSchema(key), () => {})(
    instance,
  );
