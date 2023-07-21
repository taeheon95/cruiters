import { Profile, User } from '@prisma/client';
import { UserModel } from '../../main/user/model/User';

it('user entity model 호환 테스트', () => {
  const user: User & { profile: Profile } = {
    id: BigInt(1),
    isDeleted: false,
    name: 'test',
    createAt: new Date(),
    updateAt: new Date(),
    profile: {
      address: '테스트시 테스트구 테스트동 테스트 아파트 101동 101호',
      birthDate: new Date(),
      contact: '10-0000-0000',
      countryNumber: '+82',
      email: 'test@naver.com',
      profileImage: '',
      userId: BigInt(1),
    },
  };
  const userModel: UserModel = UserModel.create(user);
  expect(userModel.id).toBe(Number(user.id));
  expect(userModel.name).toBe(user.name);
  expect(userModel.birthDate).toStrictEqual(user.profile.birthDate);
  expect(userModel.countryNumber).toBe(user.profile.countryNumber);
  expect(userModel.contact).toBe(user.profile.contact);
  expect(userModel.email).toBe(user.profile.email);
  expect(userModel.address).toBe(user.profile.address);
  expect(userModel.profileImage).toBe(user.profile.profileImage);
});
