class UserCreate {
  #name: string;
  #email: string;
  #countryNumber: string;
  #contact: string;
  #address: string;
  #profileImage: string;

  constructor() {
    this.#email = "";
    this.#name = "";
    this.#countryNumber = "";
    this.#contact = "";
    this.#address = "";
    this.#profileImage = "";
  }

  toJSON() {
    return {
      name: this.#name,
      email: this.#email,
      countryNumber: this.#countryNumber,
      contact: this.#contact,
      address: this.#address,
      profileImage: this.#profileImage,
    };
  }
}

export default UserCreate;
