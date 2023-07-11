import { User } from "@prisma/client";
import { UserModel } from "../../main/user/model/User";

it("user entity model 호환 테스트", () => {
  const user: User = {
    id: BigInt(1),
    email: "test@naver.com",
    name: "test",
    createAt: new Date(),
    updateAt: new Date(),
  };
  const userModel: UserModel = new UserModel(user);
  expect(userModel.id).toBe(Number(user.id));
  expect(userModel.email).toBe(user.email);
  expect(userModel.name).toBe(user.name);
});
