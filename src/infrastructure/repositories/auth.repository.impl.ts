import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user-entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";


export class AuthRepositoryImpl implements AuthRepository{



    constructor(private readonly authDataSource:AuthDataSource){}


    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
       return this.authDataSource.register(registerUserDto);

    }

    

}