import { UserError } from "../../main/exception/UserError";
import {
  userInputModelValidater,
  userModelValidater,
} from "../../main/user/model/User.validator";

it("유저 인풋 모델 검증 클래스 테스트", () => {
  const userInputModel = userInputModelValidater({
    email: "test1@gmail.com",
    name: "test1",
  });
  expect(userInputModel).toStrictEqual({
    email: "test1@gmail.com",
    name: "test1",
  });
});

it("유저 모델 검증 클래스 테스트", () => {
  const userModel = userModelValidater({
    email: "test@gmail.com",
    name: "test",
  });
  expect(userModel).toStrictEqual({
    email: "test@gmail.com",
    name: "test",
  });
});

it("유저 인풋 모델 에러 테스트", () => {
  expect(async () => {
    userInputModelValidater({
      email: "test1@gmail.com",
    });
  }).rejects.toThrowError(new UserError(""));
});

it("유저 모델 에러 테스트", () => {
  expect(async () => {
    userModelValidater({
      email: "test1@gmail.com",
    });
  }).rejects.toThrowError(new UserError(""));
});
