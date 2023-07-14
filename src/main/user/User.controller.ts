import { UserService } from './User.service';
import { UserModel } from './model/User';
import { userInputModelValidater } from './model/User.validator';
import { numberPipe } from '../common/Validator';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getUserList(query: unknown): Promise<UserModel[]> {
    return await this.userService.getUserList();
  }

  public async getUser(param: unknown) {
    const { id } = numberPipe('id', param);
    return await this.userService.getUser(BigInt(id));
  }

  public async postUser(body: unknown) {
    const user = userInputModelValidater(body);
    return await this.userService.createUser(user);
  }

  public async putUser(param: unknown, body: unknown) {
    const { id } = numberPipe('id', param);
    const user = userInputModelValidater(body);
    return await this.userService.updateUser(BigInt(id), user);
  }

  public async deleteUser(param: unknown) {
    const { id } = numberPipe('id', param);
    return await this.userService.deleteUser(BigInt(id));
  }
}
