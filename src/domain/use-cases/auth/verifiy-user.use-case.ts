import { AuthToken } from "../../../application/auth/auth.interface";
import { JwtAdaptar } from "../../../config/jwt-adapter";
import { PayloadToken } from "../../dto/auth/payload-token";
import { RoleType } from "../../entities/user-entity";
import { CustomError } from "../../errors/custom.error";
import { OtpRepository } from "../../repositories/otp.repository";

type VerifyUser = Pick<AuthToken, "accessToken" | "verifiyOtp">;

type SignToken = (
  payload: PayloadToken,
  duration?: string
) => Promise<string | null>;

export class VerifyUserOtp {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly signToken: SignToken = JwtAdaptar.generateToken 
  ) {}

  async execute(email:string, otp: string, id:string, role:RoleType[]): Promise<any> {


    
    try {
      console.log('trycatch email y otp:', email , otp);
      
      const isVerificated = await this.otpRepository.verifyOtp(email, otp);

    console.log('verificando otp:', isVerificated);
    


    const token = await this.signToken( {role: role,sub: id}, '3h' );

    if(!token) throw CustomError.internalServer('Error generating token')

    if (isVerificated) {
      return {
        message: 'User verified successfully',
        verifiyOtp: "completed",
        accessToken: token,
      }

    } else {
      return{
        message: 'Wrong code OTP, retry to send',
        verifiyOtp: "pending",
        
      }
    }
    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }
  }
}
