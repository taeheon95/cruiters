import { UserError } from "../../main/exception/UserError";
import { UserRepository } from "../../main/user/User.repository";
import { UserInputModel, UserModel } from "../../main/user/model/User";

export class UserTestRepository implements UserRepository {
  private userModelList: UserModel[];

  constructor(private readonly initialData: UserModel[]) {
    this.userModelList = initialData.map((data) => ({
      ...data,
    }));
  }

  initialize() {
    this.userModelList = this.initialData.map((data) => ({
      ...data,
    }));
  }

  findByEmail(email: string): Promise<UserModel | null> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => user.email === email,
    );

    return Promise.resolve(userModel ? userModel : null);
  }
  findAll(): Promise<UserModel[]> {
    return Promise.resolve(this.userModelList);
  }
  findById(id: bigint): Promise<UserModel | null> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => user.id === Number(id),
    );
    return Promise.resolve(userModel ? userModel : null);
  }
  create(data: UserInputModel): Promise<UserModel> {
    const userModel = this.userModelList[this.userModelList.length - 1];
    this.userModelList.push({
      id: userModel.id + 1,
      email: data.email,
      name: data.name,
    });

    return Promise.resolve(this.userModelList[this.userModelList.length - 1]);
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
      (user) => user.id !== Number(id),
    );
  }
}
