import { Express, Request, Response } from "express";
import { UserService } from "./User.service";
import Joi from "joi";
import { UserModel } from "./model/User";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getUserList(): Promise<UserModel[]> {
    return await this.userService.getUserList();
  }

  public async getUser(param: unknown) {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
    });
    const result = schema.validate(param);
    if (result.error) {
      throw new Error();
    }
    return await this.userService.getUser(BigInt(result.value.id));
  }

  public async postUser(body: unknown) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    });
    const user = schema.validate(body).value;
    return await this.userService.createUser(user);
  }

  public async putUser(param: unknown, body: unknown) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    });
    const idSchema = Joi.object({
      id: Joi.number().integer().required(),
    });
    const result = idSchema.validate(param);
    if (result.error) {
      throw new Error();
    }
    const user = schema.validate(body).value;
    return await this.userService.updateUser(result.value.id, user);
  }

  public async deleteUser(param: unknown) {
    const idSchema = Joi.object({
      id: Joi.number().integer().required(),
    });
    const result = idSchema.validate(param);
    if (result.error) {
      throw new Error();
    }
    return await this.userService.deleteUser(result.value.id);
  }
}
