import { AuthToken } from "../../../application/auth/auth.interface";

//todo DTO verify 
export interface VerifyUserOtpDto{
    otp: string,
    user: AuthToken
}