import { Profile, User } from '@prisma/client';

/**
 * 객체의 불변성을 유지해야 한다.
 */
export class UserModel {
  private _id: number;
  private _name: string;
  private _birthDate: Date;
  private _countryNumber: string;
  private _contact: string;
  private _email: string;
  private _address: string;
  private _profileImage: string;

  // 생성자에서는 생성만 처리한다.
  private constructor(user: User & { profile: Profile }) {
    this._id = Number(user.id);
    this._name = user.name;
    this._birthDate = new Date(user.profile.birthDate);
    this._countryNumber = user.profile.countryNumber;
    this._contact = user.profile.contact;
    this._email = user.profile.email;
    this._address = user.profile.address;
    this._profileImage = user.profile.profileImage;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get birthDate() {
    /** 불변 객체화 하여 리턴 */
    return new Date(this._birthDate);
  }

  get countryNumber() {
    return this._countryNumber;
  }

  get contact() {
    return this._contact;
  }

  get address() {
    return this._address;
  }

  get email() {
    return this._email;
  }

  get profileImage() {
    return this._profileImage;
  }

  // 유저를 객체를 생성할 때 발생할 수 있는 오류는 스태틱 함수에서 처리한다.
  public static create(user: (User & { profile: Profile | null }) | null) {
    if (user === null) {
      // TODO: 유저 모델 생성 오류 만들어야 함
      throw new Error('');
    }
    if (user.profile === null) {
      // TODO: 유저 프로필이 없을 때 오류를 만들어야 함
      throw new Error('');
    }
    // @ts-ignore
    return new UserModel(user);
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      birthDate: this._birthDate,
      countryNumber: this._countryNumber,
      contact: this._contact,
      email: this._email,
      address: this._address,
      profileImage: this._profileImage,
    };
  }
}

export interface UserInputModel {
  name: string;
  birthDate: Date;
  countryNumber: string;
  email: string;
  contact: string;
  address: string;
  profileImage: string;
}
