export class CreateUserDto {
  private constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string
  ) {
  }

  static validate(object: {
    [key: string]: any;
  }): [string?, CreateUserDto?] {
    const { firstname, lastname, email, password } = object;
    if (!firstname) return ["Missing firstname"];
    if (!lastname) return ["Missing lastname"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new CreateUserDto(firstname, lastname, email, password)];
  }
  
}
