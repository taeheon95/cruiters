import { UserError } from "../../main/exception/UserError";
import { userInputModelValidater } from "../../main/user/model/User.validator";

it("유저 모델 검증 클래스 테스트", () => {
  const userInputModel = userInputModelValidater({
    email: "test1@gmail.com",
    name: "test1",
  });
  expect(userInputModel).toStrictEqual({
    email: "test1@gmail.com",
    name: "test1",
  });
});
