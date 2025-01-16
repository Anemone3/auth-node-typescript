import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export const envs = {
    PORT: Number(process.env.PORT),
    MONGO_URL: String(process.env.MONGO_URL),
    MONGO_DB_NAME: String(process.env.MONGO_DB_NAME),
<<<<<<< HEAD
    SECRET_KEY: String(process.env.JWT_KEY)
=======
    SECRET_KEY: String(process.env.JWT_KEY),
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: String(process.env.EMAIL_PASSWORD)
>>>>>>> 3ec9c21 (s)
}