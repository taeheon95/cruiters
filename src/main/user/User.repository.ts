import { PrismaClient, User } from "@prisma/client";
import { Repository } from "../common/Repository";
import { UserInputModel, UserModel } from "./model/User";

export interface UserRepository extends Repository<UserModel, bigint> {
  findByEmail(email: string): Promise<UserModel | null>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<UserModel[]> {
    const userEntityList = await this.prisma.user.findMany();
    return userEntityList.map((userEntity) => new UserModel(userEntity));
  }

  async findById(id: number | bigint): Promise<UserModel | null> {
    const userEntity = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return userEntity ? new UserModel(userEntity) : null;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const userEntity = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userEntity ? new UserModel(userEntity) : null;
  }

  async create(user: UserInputModel): Promise<UserModel> {
    const userEntity = await this.prisma.user.create({ data: user });
    return new UserModel(userEntity);
  }

  async update(id: bigint, user: UserInputModel): Promise<UserModel> {
    const userEntity = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: user.name,
      },
    });
    return new UserModel(userEntity);
  }

  async delete(id: bigint) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
