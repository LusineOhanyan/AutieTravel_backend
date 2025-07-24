const ping = (req , res) => {
    return res.status(200).json({
        message: "pong",
        timestamp: new Date().toISOString()
    })
}

export default ping