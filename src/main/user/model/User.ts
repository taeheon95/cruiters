import { Profile, User } from '@prisma/client';

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
  private constructor() {
    this._id = 0;
    this._name = '';
    this._birthDate = new Date();
    this._countryNumber = '';
    this._contact = '';
    this._email = '';
    this._address = '';
    this._profileImage = '';
  }

  get id() {
    return this._id;
  }

  private set id(id: number | bigint) {
    this._id = Number(id);
  }

  get name() {
    return this._name;
  }

  private set name(name: string) {
    this._name = name;
  }

  get birthDate() {
    /** 불변 객체화 하여 리턴 */
    return new Date(this._birthDate);
  }

  private set birthDate(date: Date) {
    this._birthDate = new Date(date);
  }

  get countryNumber() {
    return this._countryNumber;
  }

  private set countryNumber(countryNumber: string) {
    this._countryNumber = countryNumber;
  }

  get contact() {
    return this._contact;
  }

  private set contact(contact: string) {
    this._contact = contact;
  }

  get address() {
    return this._address;
  }

  private set address(address: string) {
    this._address = address;
  }

  get email() {
    return this._email;
  }

  private set email(email: string) {
    this._email = email;
  }

  get profileImage() {
    return this._profileImage;
  }

  private set profileImage(image: string) {
    this._profileImage = image;
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
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.name = user.name;
    userModel.birthDate = user.profile.birthDate;
    userModel.countryNumber = user.profile.countryNumber;
    userModel.contact = user.profile.contact;
    userModel.email = user.profile.email;
    userModel.address = user.profile.address;
    userModel.profileImage = user.profile.profileImage;
    return userModel;
  }

  public static createUser(id: number | bigint, user: UserInputModel) {
    const userModel = new UserModel();
    userModel.id = Number(id);
    userModel.name = user.name;
    userModel.birthDate = user.birthDate;
    userModel.countryNumber = user.countryNumber;
    userModel.contact = user.contact;
    userModel.email = user.email;
    userModel.address = user.address;
    userModel.profileImage = user.profileImage;
    return userModel;
  }

  public static copy(user: UserModel) {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.name = user.name;
    userModel.birthDate = user.birthDate;
    userModel.countryNumber = user.countryNumber;
    userModel.contact = user.contact;
    userModel.email = user.email;
    userModel.address = user.address;
    userModel.profileImage = user.profileImage;
    return userModel;
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
