import { PrismaClient, User } from "@prisma/client";
import { Repository } from "../common/Repository";
import { UserInputModel, UserModel } from "./model/User";

export interface UserRepository extends Repository<User, bigint> {}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        profile: true,
      },
      where: {
        name: {
          endsWith: "",
        },
        profile: {
          birthDate: {},
        },
      },
    });
  }

  async findById(id: bigint): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user: unknown): Promise<User> {
    // @ts-ignore
    return await this.prisma.user.create({ data: user });
  }

  async update(id: bigint, user: UserInputModel): Promise<User> {
    const userEntity = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: user.name,
      },
    });
    return userEntity;
  }

  async delete(id: bigint) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
