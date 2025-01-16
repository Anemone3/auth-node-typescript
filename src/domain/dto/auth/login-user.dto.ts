export class LoginUserDto{
    private constructor(
        public email: string,
        public password: string
    ){}

    static validate( object: {[key:string]:any}): [string?, LoginUserDto?]{
        const {email, password} = object;
        if(!email) return ['Missing email', undefined];
        if (!password) return ["Missing password"];
        if (password.length < 6) return ["Password too short"];

        return [undefined, new LoginUserDto(email, password)]
    }
}