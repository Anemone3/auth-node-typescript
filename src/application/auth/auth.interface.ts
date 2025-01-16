import { RoleType } from "../../domain/entities/user-entity"

export interface AuthToken{
    accessToken?: string,
    verifiyOtp: 'pending' | 'completed',
    user: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        profile: string,
        role: RoleType[]
    }
}