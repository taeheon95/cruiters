import Joi from "joi";

describe("joi schema test", () => {
  it("joi number test", () => {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
    });
    const result = schema.validate({ id: "1" });
    expect(result.value.id).toBe(1);
  });
});
