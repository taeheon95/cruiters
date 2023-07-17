class UserVO {
  id: number;
  name: string;
  birthDate: Date;
  countryNumber: string;
  contact: string;
  email: string;
  address: string;
  profileImage: string;

  constructor() {
    this.id = -1;
    this.name = "";
    this.birthDate = new Date();
    this.countryNumber = "";
    this.contact = "";
    this.email = "";
    this.address = "";
    this.profileImage = "";
  }

  public static create() {}
}

export default UserVO;
