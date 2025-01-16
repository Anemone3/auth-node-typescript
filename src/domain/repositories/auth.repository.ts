import { LoginUserDto } from "../dto/auth/login-user.dto";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { UserEntity } from "../entities/user-entity";

export interface AuthRepository {

    
    login(loginUserDto: LoginUserDto): Promise<UserEntity> 

    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> 

}