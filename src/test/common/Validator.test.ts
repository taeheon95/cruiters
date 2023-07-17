import Joi from "joi";
import { validate } from "../../main/common/Validator";

describe("validate 함수 테스트", () => {
  const mockFn = jest.fn();
  const validator = validate<{ id: number }>(
    Joi.object({
      id: Joi.number().integer().required(),
    }),
    mockFn,
  );
  it("성공 시", () => {
    const { id } = validator({ id: 1 });
    expect(id).toBe(1);
  });
  it("실패 시 목 함수 호출", () => {
    validator({ id: "dfadsf" });
    expect(mockFn).toBeCalledTimes(1);
  });
});
