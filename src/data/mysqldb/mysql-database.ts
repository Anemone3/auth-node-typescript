import {  PrismaClient } from "@prisma/client";



export const prisma = new PrismaClient();

export class MysqlDatabase{

    static async connect(prismaConnect: PrismaClient){
        try {
            await prismaConnect.$connect();
            console.log('Mysql connected');
        } catch (error) {
            console.log('Mysql connection error');
            throw error;
        }
    }
}