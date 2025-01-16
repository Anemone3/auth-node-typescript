import { AuthToken } from "../../../application/auth/auth.interface";


export interface VerifyUserOtpDto{
    otp: string,
    user: AuthToken
}