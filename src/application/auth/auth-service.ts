import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { VerifyUserOtpDto } from "../../domain/dto/auth/verify-user.dto";
import { RoleType } from "../../domain/entities/user-entity";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { EmailRepository } from "../../domain/repositories/email.repository";
import { OtpRepository } from "../../domain/repositories/otp.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { VerifyUserOtp } from "../../domain/use-cases/auth/verifiy-user.use-case";
import { AuthToken } from "./auth.interface";


export class AuthService{
    
    private readonly loginUser: LoginUser;
    private readonly registerUser: RegisterUser;
    private readonly verifyUser: VerifyUserOtp;
    
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly otpRepository: OtpRepository,
        private readonly userRepository: UserRepository
    ){
        this.loginUser = new LoginUser(this.authRepository,this.otpRepository); 
        this.registerUser = new RegisterUser(this.authRepository,this.otpRepository);
        this.verifyUser = new VerifyUserOtp(this.otpRepository,this.userRepository);
    }


  async login(loginUser: LoginUserDto): Promise<AuthToken> {
    return this.loginUser.execute(loginUser);
  }


  async register(registerUser: RegisterUserDto): Promise<AuthToken> {
    return this.registerUser.execute(registerUser);
  }


async verifyUserAndSendToken(email: string, otp: string): Promise<AuthToken | null> {

  if (!email || !email.includes("@")) {
  throw CustomError.badRequest("Email inválido");
}



  if (!otp || otp.trim().length === 0) {

      throw CustomError.badRequest(`Otp is missing`)
    }
    
    return this.verifyUser.execute(email , otp);
  }
}