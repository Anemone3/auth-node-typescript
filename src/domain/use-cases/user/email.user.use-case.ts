import { UserEntity } from "../../entities/user-entity";
import { UserRepository } from "../../repositories/user.repository";


interface UserUseCase{
    execute(email: string): Promise<UserEntity>
}


export class EmailUser{
    constructor(private readonly userRepository: UserRepository){}

    execute(email: string): Promise<UserEntity>{
        return this.userRepository.getUserByEmail(email);
    }

}