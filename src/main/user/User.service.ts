import { User } from "@prisma/client";
import { Service } from "../common/Service";
import { UserRepository } from "./User.repository";
import { UserInputModel, UserModel } from "./model/User";
import { UserError } from "../exception/UserError";

export interface UserService extends Service {
  getUserList(): Promise<UserModel[]>;
  getUser(id: bigint): Promise<UserModel>;
  createUser(user: UserInputModel): Promise<UserModel>;
  updateUser(id: bigint, user: UserInputModel): Promise<UserModel>;
  deleteUser(id: bigint): Promise<UserModel>;
}

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserList() {
    return await this.userRepository.findAll();
  }

  public async getUser(id: bigint) {
    return await this.userRepository.findById(id);
  }

  public async createUser(user: UserInputModel) {
    return await this.userRepository.create(user);
  }

  public async updateUser(id: bigint, user: UserInputModel) {
    return await this.userRepository.update(id, user);
  }

  public async deleteUser(id: bigint) {
    return await this.userRepository.delete(id);
  }
}
