import jwt from 'jsonwebtoken'
import { envs } from './envs'
import { PayloadToken } from '../domain/dto/auth/payload-token'

export class JwtAdaptar{

    static  generateToken(payload: PayloadToken, duration: string = '2h') : Promise<string|null>{
        return new Promise((resolve) => {
            jwt.sign(payload, envs.SECRET_KEY, {expiresIn: duration}, (err, token) => {
                if(err) resolve(null)
                resolve(token!)
            })
        })
    }



    static  validateToken<T>(token: string) : Promise<T|null>{
        return new Promise((resolve) => {
            jwt.verify(token, envs.SECRET_KEY, (err, decoded) => {
                if(err) resolve(null)
                resolve(decoded as T)
            })
        })
    }


}