import ping from "./ping.js"

const configureRouter = (app) => {
    app.use("/ping" , ping)
}

export default configureRouter