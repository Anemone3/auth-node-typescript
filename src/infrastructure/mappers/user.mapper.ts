import { UserEntity } from "../../domain/entities/user-entity";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper{
    static userEntityFromDto(object: { [key:string]: any}){
        
        const { id,_id,firstname,lastname,email,password,role,img} = object;


        return new UserEntity(_id || id,firstname,lastname,email,password,role,img)
    }

        static userEntityToResponse(object: { [key:string]: any}){
        
        const { id,_id,firstname,lastname,email,password,role,img,createdAt,updatedAt} = object;


        return new UserEntity(_id || id,firstname,lastname,email,password,role,img,createdAt,updatedAt)
    }
}