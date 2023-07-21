import { Service } from '../common/Service';
import { UserRepository } from './User.repository';
import { UserInputModel, UserModel } from './model/User';
import { UserError } from '../exception/UserError';
import UserCreate from './model/dto/UserCreate.dto';
import { UserSearch } from './model/dto/UserSearch.dto';

export interface UserService extends Service {
  getUserList(searchParams: UserSearch): Promise<UserModel[]>;
  getUser(id: bigint): Promise<UserModel>;
  createUser(user: UserCreate): Promise<UserModel>;
  updateUser(id: bigint, user: UserInputModel): Promise<UserModel>;
  deleteUser(id: bigint): void;
}

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserList(userSearch: UserSearch) {
    return await this.userRepository.findAll(userSearch);
  }

  public async getUser(id: bigint) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserError('no user found');
    }
    return user;
  }

  public async createUser(user: UserCreate) {
    return await this.userRepository.create(user);
  }

  public async updateUser(id: bigint, user: UserInputModel) {
    const existUser = await this.userRepository.findById(id);
    if (existUser === null) {
      throw new UserError('user not exist');
    }
    return await this.userRepository.update(id, user);
  }

  public async deleteUser(id: bigint) {
    await this.userRepository.delete(id);
  }
}
