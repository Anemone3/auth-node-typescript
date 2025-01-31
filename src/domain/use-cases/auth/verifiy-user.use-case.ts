import { AuthToken } from "../../../application/auth/auth.interface";
import { JwtAdaptar } from "../../../config/jwt-adapter";
import { PayloadToken } from "../../dto/auth/payload-token";
import { RoleType } from "../../entities/user-entity";
import { CustomError } from "../../errors/custom.error";
import { OtpRepository } from "../../repositories/otp.repository";
import { UserRepository } from "../../repositories/user.repository";

type SignToken = (
  payload: PayloadToken,
  duration?: string
) => Promise<string | null>;

export class VerifyUserOtp {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly useRepository: UserRepository,
    private readonly signToken: SignToken = JwtAdaptar.generateToken
  ) {}

  async execute(
    email: string,
    otp: string
  ): Promise<AuthToken | null> {
    try {

      const isVerificated = await this.otpRepository.verifyOtp(email, otp);



      if (!isVerificated) throw CustomError.badRequest("Invalid OTP");
      

       const user = await this.useRepository.getUserByEmail(email);
        console.log(user);
        
        const token = await this.signToken({ role: user.role, sub: user.id }, "3h");

        if (!token) throw CustomError.internalServer("Error generating token");
        return {
          message: "User verified successfully",
          accessToken: token,
          authenticate: "completed",
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profile: user.profile!,
            role: user.role,
            createdAt: user.createdAt!,
            updatedAt: user.updatedAt!,
          },
        };
    } catch (error) {
      throw error
    }
  }
}
