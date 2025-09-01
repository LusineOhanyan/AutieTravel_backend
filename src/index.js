import app from "./app.js"
import configureRouter from "./routes/index.js"
import sequelize from "./db/sequelize.js";
import { runMigration } from "./db/migrations/index.js";

import dotenv from "dotenv"
dotenv.config();

const startApp = () => {
    app.listen(3000 ,async () => {
        console.log("Server running on port 3000")

        configureRouter(app)

        await sequelize.sync({force: false , alter: true})
        await runMigration()
    })
}

startApp();