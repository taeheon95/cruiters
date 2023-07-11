import { UserError } from "../../main/exception/UserError";
import { UserRepository } from "../../main/user/User.repository";
import { UserInputModel, UserModel } from "../../main/user/model/User";

export class UserRepositoryImpl implements UserRepository {
  private userModelList: UserModel[] = [
    {
      id: 1,
      email: "test@naver.com",
      name: "test",
    },
    {
      id: 2,
      email: "test@gmail.com",
      name: "test2",
    },
  ];

  findByEmail(email: string): Promise<UserModel> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => user.email === email
    );

    if (!userModel) {
      throw new UserError("no user finded");
    }

    return Promise.resolve(userModel);
  }
  findAll(): Promise<UserModel[]> {
    return Promise.resolve(this.userModelList);
  }
  findById(id: bigint): Promise<UserModel> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => user.id === Number(id)
    );
    if (!userModel) {
      throw new UserError("no user finded");
    }
    return Promise.resolve(userModel);
  }
  create(data: UserInputModel): Promise<UserModel> {
    const userModel = this.userModelList[this.userModelList.length - 1];
    this.userModelList.push({
      id: userModel.id + 1,
      email: data.email,
      name: data.name,
    });

    return Promise.resolve(userModel);
  }
  update(id: bigint, data: UserInputModel): Promise<UserModel> {
    const userModel = this.userModelList.find((user) => user.id === Number(id));

    if (!userModel) {
      throw new UserError("no user finded");
    }
    userModel.email = data.email;
    userModel.name = data.name;
    return Promise.resolve(userModel);
  }
  delete(id: bigint) {
    this.userModelList = this.userModelList.filter(
      (user) => user.id !== Number(id)
    );
  }
}
