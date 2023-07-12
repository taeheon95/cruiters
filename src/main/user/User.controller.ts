import { UserService } from "./User.service";
import { UserModel } from "./model/User";
import { UserInputModelValidator } from "./model/User.validator";
import { NumberPipe } from "../common/Validator";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getUserList(): Promise<UserModel[]> {
    return await this.userService.getUserList();
  }

  public async getUser(param: unknown) {
    const id = new NumberPipe().validate(param);
    return await this.userService.getUser(BigInt(id));
  }

  public async postUser(body: unknown) {
    const user = new UserInputModelValidator().validate(body);
    return await this.userService.createUser(user);
  }

  public async putUser(param: unknown, body: unknown) {
    const id = new NumberPipe().validate(param);
    const user = new UserInputModelValidator().validate(body);
    return await this.userService.updateUser(BigInt(id), user);
  }

  public async deleteUser(param: unknown) {
    const id = new NumberPipe().validate(param);
    return await this.userService.deleteUser(BigInt(id));
  }
}
