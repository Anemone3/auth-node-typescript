import { RoleType } from "../../domain/entities/user-entity"

export interface AuthToken{
    message?: string,
    accessToken?: string,
    authenticate: 'pending' | 'completed',
    user: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        profile: string,
        role: RoleType,
        createdAt?: Date,
        updatedAt?: Date
    }
}