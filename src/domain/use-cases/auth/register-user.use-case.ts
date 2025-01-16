import { AuthToken } from "../../../application/auth/auth.interface";
import { JwtAdaptar } from "../../../config/jwt-adapter";
import { PayloadToken } from "../../dto/auth/payload-token";
import { RegisterUserDto } from "../../dto/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { EmailRepository } from "../../repositories/email.repository";
import { OtpRepository } from "../../repositories/otp.repository";
import { AuthBase } from "./auth-base.use-case";

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<AuthToken>;
}

export class RegisterUser extends AuthBase implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    otpRepository: OtpRepository,
  ) {
    super(otpRepository)
  }

  async execute(registerUserDto: RegisterUserDto): Promise<AuthToken> {
    const user = await this.authRepository.register(registerUserDto);
    // const otp = this.otpRepository.generateOTP();


    // if (!otp) {
    //   throw CustomError.internalServer("Error generating OTP");
    // }

    // // Guardar OTP
    // await this.otpRepository.saveOTP(user.email, otp, 300);

    // // Enviar OTP por correo electrónico
    // await this.emailRepository.sendEmail(
    //   user.email,
    //   "Verify Your Account",
    //   "OTP Verification",
    //   `<h1>Your OTP is: ${otp}</h1>`
    // );

    await this.generateAndSendOTP(user.email);

    return {
      verifiyOtp: "pending",
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profile: user.img!,
        role: user.role,
      },
    };
  }
}
