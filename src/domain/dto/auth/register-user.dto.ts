import { IsEmail, IsNotEmpty, MinLength, validate } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty({ message: "Firstname is required" })
  firstname: string;

  @IsNotEmpty({ message: "Lastname is required" })
  lastname: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(7, { message: "Password too short, minimum length is 6" })
  password: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[string?, RegisterUserDto?]> {
    const registerDto = new RegisterUserDto(
      object.firstname,
      object.lastname,
      object.email,
      object.password
    );

    const errors = await validate(registerDto);

    if (errors.length > 0) {
      return [
        errors[0].constraints
          ? Object.values(errors[0].constraints)[0]
          : "Validation failed",
        undefined,
      ];
    }

    return [undefined, registerDto];
  }
}
