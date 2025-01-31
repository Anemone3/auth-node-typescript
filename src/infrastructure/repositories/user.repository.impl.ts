import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dto/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dto/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user-entity";




export class UserRepositoryImpl implements UserRepository{

    constructor(private readonly userDataSource:UserDataSource){}

    getUser(): Promise<UserEntity[]> {
        return this.userDataSource.getUser();
    }
    getUserById(id: string): Promise<UserEntity> {
        return this.userDataSource.getUserById(id);
    }
    createUser(user: CreateUserDto): Promise<UserEntity> {
        return this.userDataSource.createUser(user);
    }
    updateUser(id: string, userUpdate: UpdateUserDto): Promise<UserEntity> {
        return this.userDataSource.updateUser(id, userUpdate);
    }
    deleteUser(id: string): Promise<UserEntity> {
        return this.userDataSource.deleteUser(id);
    }

    getUserByEmail(email: string): Promise<UserEntity> {
        return this.userDataSource.getUserByEmail(email);
    }
}