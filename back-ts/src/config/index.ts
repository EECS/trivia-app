import dotenv from "dotenv"

const envFound = dotenv.config()

if (envFound.error) {
    // Want this to crash entire process if cannot be found.
    throw new Error("Couldn't find .env file.")
}


export default {
    environment: process.env.NODE_ENV,
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    api: {
        prefix: "/api"
    },

    redis: {
        secretKey: process.env.REDIS_SECRET,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        name: process.env.REDIS_NAME
    },
    postgres: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        dbName: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
    }
}