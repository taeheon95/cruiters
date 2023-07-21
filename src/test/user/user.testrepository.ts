import { UserError } from '../../main/exception/UserError';
import { UserRepository } from '../../main/user/User.repository';
import { UserInputModel, UserModel } from '../../main/user/model/User';

export class UserTestRepository implements UserRepository {
  private userModelList: UserModel[];

  constructor(private readonly initialData: UserModel[]) {
    this.userModelList = initialData.map(UserModel.copy);
  }

  initialize() {
    this.userModelList = this.initialData.map(UserModel.copy);
  }

  findByEmail(email: string): Promise<UserModel | null> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => user.email === email
    );

    return Promise.resolve(userModel ? userModel : null);
  }
  findAll(): Promise<UserModel[]> {
    return Promise.resolve(this.userModelList);
  }
  findById(id: bigint): Promise<UserModel | null> {
    const userModel: UserModel | undefined = this.userModelList.find(
      (user) => Number(user.id) === Number(id)
    );
    return Promise.resolve(userModel ? userModel : null);
  }
  create(data: UserInputModel): Promise<UserModel> {
    const userModel = this.userModelList[this.userModelList.length - 1];
    this.userModelList.push(
      UserModel.createUser(Number(userModel.id) + 1, data)
    );

    return Promise.resolve(this.userModelList[this.userModelList.length - 1]);
  }
  update(id: bigint, data: UserInputModel): Promise<UserModel> {
    const idx = this.userModelList.findIndex(
      (user) => Number(user.id) === Number(id)
    );
    if (idx === -1) {
      throw new UserError('no user finded');
    }
    this.userModelList[idx] = UserModel.createUser(id, data);
    return Promise.resolve(this.userModelList[idx]);
  }
  delete(id: bigint) {
    const idx = this.userModelList.findIndex(
      (user) => Number(user.id) === Number(id)
    );
    if (idx === -1) {
      throw new UserError('no user finded');
    }
    const user = this.userModelList.splice(idx, 1);
    return Promise.resolve(user[0]);
  }
}
