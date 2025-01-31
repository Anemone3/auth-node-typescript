import { CreateUserDto } from "../../domain/dto/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dto/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user-entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserResponse } from "./user-interface";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private responseUser(userEntity: UserEntity): UserResponse {
    return {
      id: userEntity.id,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
      email: userEntity.email,
      profile: userEntity.profile!,
      role: userEntity.role,
      createdAt: userEntity.createdAt!,
      updatedAt: userEntity.updatedAt!,
    };
  }

  async findAll(): Promise<UserResponse[]> {
    const user = await this.userRepository.getUser();
    const userResponse: UserResponse[] = user.map((user) =>
      this.responseUser(user)
    );

    return userResponse;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.userRepository.getUserById(id);
    return this.responseUser(user);
  }

  async create(user: CreateUserDto) {
    const newUser = await this.userRepository.createUser(user);
    return this.responseUser(newUser);
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const updatedUser = await this.userRepository.updateUser(id, updateUser);
    return this.responseUser(updatedUser);
  }

  async delete(id: string) {
    const userDeleteado = await this.userRepository.deleteUser(id);
    return this.responseUser(userDeleteado);
  }


}
