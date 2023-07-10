import { User } from "@prisma/client";

export class UserModel {
  id: number;
  email: string;
  name: string;

  constructor(userEntity: User) {
    this.id = Number(userEntity.id);
    this.email = userEntity.email;
    this.name = userEntity.name;
  }
}

export class UserInputModel {
  private _email: string;
  private _name: string;

  constructor() {
    this._email = "";
    this._name = "";
  }

  set email(email: string) {
    this._email = email;
  }

  set name(name: string) {
    this._name = name;
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }
}
