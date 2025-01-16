import { BcryptAdaptar } from "../../../config/bcrypt-adapter";
import { UserModel } from "../../../data";
import { AuthDataSource } from "../../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../../domain/dto/auth/login-user.dto";
import { RegisterUserDto } from "../../../domain/dto/auth/register-user.dto";
import { UserEntity } from "../../../domain/entities/user-entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserMapper } from "../../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class MongoAuthDataSourceImpl implements AuthDataSource {


    constructor(
        private readonly hashPassword: HashFunction = BcryptAdaptar.hash,
        private readonly comparePassword: CompareFunction = BcryptAdaptar.compare
    ) { }



    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const {email,password} = loginUserDto;

        try {
            const exists = await UserModel.findOne({email:email});

            if(!exists) throw CustomError.badRequest("Emails not exists");

            const isMatch = this.comparePassword(password, exists.password!);

            if(!isMatch) throw CustomError.badRequest("Invalid credentials");
            
            return UserMapper.userEntityFromDto(exists);



        } catch (error) {
            
            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof Error) {
                throw CustomError.internalServer(error.message);
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { email, firstname, lastname, password } = registerUserDto;
        try {
        const exits = await UserModel.findOne({ email: email });

        if (exits) throw CustomError.badRequest("User already exists");


        const user = await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: this.hashPassword(password)
        });

        await user.save();

        return UserMapper.userEntityFromDto(user);
        
        } catch (error) {

        if (error instanceof CustomError) {
            throw error;
        }

        if (error instanceof Error) {
            throw CustomError.internalServer(error.message);
        }
        console.log(error);
        throw CustomError.internalServer();
        }
  }
}
