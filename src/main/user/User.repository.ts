import { PrismaClient, User } from "@prisma/client";
import { Repository } from "../common/Repository";
import { UserInputModel, UserModel } from "./model/User";
import { UserSearch } from "./model/dto/UserSearch.dto";

export interface UserRepository extends Repository<User, bigint> {}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(searchParam: UserSearch): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        profile: true,
      },
      where: {
        name: {
          contains: searchParam.name,
        },
        profile: {
          countryNumber: searchParam.countryNumber,
          contact: {
            contains: searchParam.contact,
          },
          email: {
            contains: searchParam.email,
          },
          address: {
            contains: searchParam.address,
          },
          birthDate: {
            gte: searchParam.birthDateStart,
            lte: searchParam.birthDateEnd,
          },
        },
        createAt: {
          gte: searchParam.createAtStart,
          lte: searchParam.createAtEnd,
        },
        updateAt: {
          gte: searchParam.updateAtStart,
          lte: searchParam.updateAtEnd,
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
