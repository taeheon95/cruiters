import { UserService } from "./User.service";
import { userInputModelValidater } from "./model/User.validator";
import { numberPipe } from "../common/Validator";
import { Request, Response } from "express";
import { validateUserSearchSchema } from "./model/dto/UserSearch.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getUserList(req: Request, res: Response) {
    const query = validateUserSearchSchema(req.query);
    const userList = await this.userService.getUserList(query);
    res.status(200).json(userList);
  }

  public async getUser(req: Request, res: Response) {
    const { id } = numberPipe("id", req.param);
    res.status(200).json(await this.userService.getUser(BigInt(id)));
  }

  public async postUser(req: Request, res: Response) {
    const user = userInputModelValidater(req.body);
    const result = await this.userService.createUser(user);
    res.setHeader("location", `/user/${result.id}`);
    res.status(201).json();
  }

  public async putUser() {
    const { id } = numberPipe("id", param);
    const user = userInputModelValidater(body);
    return await this.userService.updateUser(BigInt(id), user);
  }

  public async deleteUser(param: unknown) {
    const { id } = numberPipe("id", param);
    return await this.userService.deleteUser(BigInt(id));
  }
}
