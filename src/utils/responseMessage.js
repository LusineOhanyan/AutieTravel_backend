

export function sendResStatus(res, statuscode = 200){
    return res.status(statuscode).end();
}

export function sendResponseBody(res, statusCode = 200, message = "Success", data = null){
    return res.status(statusCode).json({
        status: statusCode >= 400 ? "error" : "success",
        message,
        data,
    });
}