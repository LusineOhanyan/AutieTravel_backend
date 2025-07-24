import getEnv from "../utils/env.js"
import dotenv from "dotenv"

dotenv.config()
export default {
    development: {
        username: getEnv("DB_USER"),
        password: getEnv("DB_PASS"),
        database: getEnv("DB_NAME"),
        host: getEnv("DB_HOST"),
        port: getEnv("DB_PORT") || 5432,
        dialect: "postgres"
    }
}