import { AuthToken } from "../../../application/auth/auth.interface";
import { JwtAdaptar } from "../../../config/jwt-adapter";
import { LoginUserDto } from "../../dto/auth/login-user.dto";
import { PayloadToken } from "../../dto/auth/payload-token";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { EmailRepository } from "../../repositories/email.repository";
import { OtpRepository } from "../../repositories/otp.repository";
import { AuthBase } from "./auth-base.use-case";




interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<AuthToken>;
}


export class LoginUser extends AuthBase implements LoginUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository,
        otpRepository: OtpRepository,
    ){
        super(otpRepository)
    }

    async execute(loginUserDto: LoginUserDto): Promise<AuthToken> {

        const { email, password } = loginUserDto;

        const user = await this.authRepository.login({email,password});

        if(!user) throw CustomError.badRequest('Invalid credentials');

        await this.generateAndSendOTP(user.email)


        return{
            message:'Código enviado, revisa el correo',
            authenticate: 'pending',
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                profile: user.profile!,
                role: user.role
            }
        }

    }

}