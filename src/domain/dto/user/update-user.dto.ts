import { IsEmail, IsOptional, validate } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  firstname?: string;

  @IsOptional()
  lastname?: string;

  @IsOptional()
  profile?:string

  @IsOptional()
  @IsEmail()
  email?:string

  constructor(
    firstname: string,
    lastname: string,
    profile:string,
    email: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.profile = profile;
    this.email = email;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[string?, UpdateUserDto?]> {
    const updateDto = new UpdateUserDto(
      object.firstname,
      object.lastname,
      object.profile,
      object.email
    );

    const errors = await validate(updateDto);

    if (errors.length > 0) {
      return [
        errors[0].constraints
          ? Object.values(errors[0].constraints)[0]
          : "Validation failed",
        undefined,
      ];
    }

    return [undefined, updateDto];
  }
}
