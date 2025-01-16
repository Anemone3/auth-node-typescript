import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../data";
import { UserDataSource } from "../../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../../domain/dto/user/create-user.dto";
import { UpdateUserDto } from "../../../domain/dto/user/update-user.dto";
import { UserEntity } from "../../../domain/entities/user-entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserMapper } from "../../mappers/user.mapper";

export class UserPrismaDataSourceImpl implements UserDataSource {
  async getUser(): Promise<UserEntity[]> {
    try {
      const prismas = new PrismaClient();
      const users = await prismas.user.findMany();

      
      
      return users.map(user => UserMapper.userEntityToResponse(user));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
  async getUserById(id: string): Promise<UserEntity> {
    try {
      const users = await prisma.user.findUnique({ where: { id: id } });

      if (!users) throw CustomError.notFound("User not found");

      return UserMapper.userEntityToResponse(users);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, firstname, lastname, password } = createUserDto;

    try {
      const user = await prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        },
      });

      return UserMapper.userEntityToResponse(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateUser(id: string, updateUser: UpdateUserDto): Promise<UserEntity> {

    try {
      const exists = await prisma.user.findUnique({ where: { id: id } });

      if (!exists) throw CustomError.notFound("User not found");
    
      const user = await prisma.user.update({
        where: { id: id },
        data: { ...updateUser, updatedAt: new Date()},
      });

      return UserMapper.userEntityToResponse(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteUser(id: string): Promise<UserEntity> {
    try {
      const exists = await prisma.user.findUnique({ where: { id: id } });

      if (!exists) throw CustomError.notFound("User not found");
    
      const userDelete = await prisma.user.delete({where:{id: id}})

      return UserMapper.userEntityFromDto(userDelete);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
