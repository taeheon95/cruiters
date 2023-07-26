import { UserError } from '../../main/exception/UserError';
import { UserRepository } from '../../main/user/User.repository';
import { UserService, UserServiceImpl } from '../../main/user/User.service';
import { UserInputModel, UserModel } from '../../main/user/model/User';
import { UserTestRepository } from './user.testrepository';

describe('user service 단순 crud test', () => {
  const userRepository = new UserTestRepository([
    UserModel.create({
      id: BigInt(1),
      name: 'test1',
      isDeleted: false,
      profile: {
        address: 'address1',
        birthDate: new Date(),
        contact: '10-0000-0000',
        countryNumber: '+82',
        email: 'test1@gmail.com',
        profileImage: 'test1',
        userId: BigInt(1),
      },
      createAt: new Date(),
      updateAt: new Date(),
    }),
    UserModel.create({
      id: BigInt(2),
      name: 'test2',
      isDeleted: false,
      profile: {
        address: 'address2',
        birthDate: new Date(),
        contact: '10-1111-1111',
        countryNumber: '+82',
        email: 'test2@gmail.com',
        profileImage: 'test2',
        userId: BigInt(2),
      },
      createAt: new Date(),
      updateAt: new Date(),
    }),
  ]);
  const userService: UserService = new UserServiceImpl(userRepository);

  beforeEach(() => {
    userRepository.initialize();
  });

  it('user id 조회', async () => {
    const user = await userService.getUser(BigInt(1));
    expect(user.id).toBe(1);
    expect(user.email).toBe('test@gmail.com');
    expect(user.name).toBe('test1');
  });

  it('user 조회 시 못찾을 경우', async () => {
    await expect(async () => {
      await userService.getUser(BigInt(100));
    }).rejects.toThrowError(new UserError('no user found'));
  });

  it('user 생성', async () => {
    const user: UserInputModel = {
      name: 'test3',
      address: 'address3',
      birthDate: new Date(),
      contact: '10-2222-2222',
      countryNumber: '+82',
      email: 'test3@naver.com',
      profileImage: 'image3',
    };
    const newUser = await userService.createUser(user);
    expect(newUser.email).toBe(user.email);
    expect(newUser.name).toBe(user.name);
  });

  it('user 생성 시 이메일이 중복되는 경우', async () => {
    const user = {
      name: 'test3',
      address: 'address3',
      birthDate: new Date(),
      contact: '10-2222-2222',
      countryNumber: '+82',
      email: 'test3@naver.com',
      profileImage: 'image3',
    };
    user.email = 'test@naver.com';
    user.name = 'test1';
    await expect(async () => {
      await userService.createUser(user);
    }).rejects.toThrowError(new UserError('duplicated email'));
  });

  it('user 업데이트 시', async () => {
    const user = {
      name: 'test3',
      address: 'address3',
      birthDate: new Date(),
      contact: '10-2222-2222',
      countryNumber: '+82',
      email: 'test3@naver.com',
      profileImage: 'image3',
    };
    user.email = 'test@gmail.com';
    user.name = 'test_user';
    const newUser = await userService.updateUser(BigInt(1), user);
    expect(newUser.id).toBe(1);
    expect(newUser.email).toBe(user.email);
    expect(newUser.name).toBe(user.name);
  });

  it('user 업데이트 시 유저가 없을 때', async () => {
    const user = {
      name: 'test3',
      address: 'address3',
      birthDate: new Date(),
      contact: '10-2222-2222',
      countryNumber: '+82',
      email: 'test3@naver.com',
      profileImage: 'image3',
    };
    user.email = 'test@gmail.com';
    user.name = 'test_user';
    await expect(async () => {
      await userService.updateUser(BigInt(3), user);
    }).rejects.toThrowError(new UserError('user not exist'));
  });

  it('user 삭제 테스트', async () => {
    await userService.deleteUser(BigInt(1));
    const userList = await userService.getUserList();
    expect(userList.length).toBe(1);
  });

  it('user 삭제 시 없는 id 삭제 시', async () => {
    await userService.deleteUser(BigInt(10));
    const userList = await userService.getUserList();
    expect(userList.length).toBe(2);
  });
});
