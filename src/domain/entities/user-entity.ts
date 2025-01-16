export class UserEntity{
    constructor(
        public id:string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public role: RoleType[],
        public img?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){}
}

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER= 'CUSTOMER'
}
