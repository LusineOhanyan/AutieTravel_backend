import app from "./app.js"
import configureRouter from "./routes/index.js"
import sequelize from "./db/sequelize.js";

import dotenv from "dotenv"
dotenv.config();

const startApp = () => {
    app.listen(3000 , () => {
        console.log("Server running on port 3000")

        configureRouter(app)

        sequelize.sync({force: true , alter: true})
    })
}

startApp();