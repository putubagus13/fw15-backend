const errrorHendle = (response, error)=>{
    if(error?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Error email already used!"
        })
    }
    if(error?.message?.includes("empty_failed")){
        return response.status(400).json({
            success: false,
            message: "Error: Email or Password cant be empty"
        })
    }

    if(error?.message?.includes("format_wrong")){
        return response.status(400).json({
            success: false,
            message: "Error: Email wrong!"
        })
    }

    if(error === undefined){
        return response.status(404).json({
            success: false,
            message: "Error: user not found"
        })
    }

    if(error?.message?.includes("wrong_credentials")){
        return response.status(400).json({
            success: false,
            message: "Error: email or password is wrong!"
        })
    }

    if(error?.message?.includes("unauthorized")){
        return response.status(400).json({
            success: false,
            message: "Error: authorization is failed!"
        })
    }

    if(error?.message?.includes("jwt malformed")){
        return response.status(401).json({
            success: false,
            message: "Token invalid!"
        })
    }

    if(error?.message?.includes("invalid signature")){
        return response.status(401).json({
            success: false,
            message: "Token signature is invalid!"
        })
    }

    if(error?.message?.includes("password_unmatch")){
        return response.status(401).json({
            success: false,
            message: "Password and confirm passwod unmatch"
        })
    }

    if(error?.message?.includes("update_failed")){
        return response.status(400).json({
            success: false,
            message: "Error: user not found!"
        })
    }

    if (error.message === "not_user") {
        return response.status(404).json({
            success: false,
            message: "Error: User not found"
        })
    }

    if (error.message === "forgot_failed") {
        return response.status(404).json({
            success: false,
            message: "Request resets password failed"
        })
    }

    console.log(error)
    return response.status(500).json({
        success: false,
        message: "Error: Intenal server error"
    })
}

module.exports = errrorHendle
