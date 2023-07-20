import { PrismaClient, User } from '@prisma/client';
import { Repository } from '../common/Repository';
import { UserInputModel, UserModel } from './model/User';
import { UserSearch } from './model/dto/UserSearch.dto';

export interface UserRepository extends Repository<UserModel, bigint> {}

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(searchParam: UserSearch): Promise<UserModel[]> {
    const userList = await this.prisma.user.findMany({
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
    return userList.map(UserModel.create);
  }

  async findById(id: bigint): Promise<UserModel> {
    const user = UserModel.create(
      await this.prisma.user.findUnique({
        include: {
          profile: true,
        },
        where: {
          id,
        },
      })
    );
    return user;
  }

  async create(userCreate: UserInputModel): Promise<UserModel> {
    const result = await this.prisma.user.create({
      include: {
        profile: true,
      },
      data: {
        name: userCreate.name,
        profile: {
          create: this.putUserData(userCreate),
        },
      },
    });
    return UserModel.create(result);
  }

  async update(id: bigint, user: UserInputModel): Promise<UserModel> {
    const userEntity = await this.prisma.user.update({
      include: {
        profile: true,
      },
      where: {
        id,
      },
      data: {
        name: user.name,
        profile: {
          update: {
            data: this.putUserData(user),
            where: {
              userId: id,
            },
          },
        },
      },
    });
    return UserModel.create(userEntity);
  }

  async delete(id: bigint) {
    const deletedUser = await this.prisma.user.update({
      data: {
        isDeleted: true,
        resume: {
          updateMany: {
            data: {
              isDeleted: true,
            },
            where: {
              userId: id,
            },
          },
        },
      },
      include: {
        profile: true,
        resume: true,
      },
      where: {
        id,
      },
    });
    return UserModel.create(deletedUser);
  }

  private putUserData(user: UserInputModel) {
    return {
      birthDate: user.birthDate,
      address: user.address,
      contact: user.contact,
      countryNumber: user.countryNumber,
      email: user.email,
      profileImage: user.profileImage,
    };
  }
}
