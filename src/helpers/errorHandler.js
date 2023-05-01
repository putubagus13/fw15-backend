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

    if(error?.message?.includes("password_empty")){
        return response.status(401).json({
            success: false,
            message: "Old password cant be empty"
        })
    }

    if(error?.message?.includes("Change_failed")){
        return response.status(401).json({
            success: false,
            message: "Change password failed"
        })
    }

    if(error?.message?.includes("Cant_same_password")){
        return response.status(401).json({
            success: false,
            message: "The new password cannot be the same as the old password"
        })
    }

    if(error?.message?.includes("update_failed")){
        return response.status(400).json({
            success: false,
            message: "Error: user not found!"
        })
    }

    if(error?.message?.includes("wishlist_not_found")){
        return response.status(400).json({
            success: false,
            message: "Error: wishlist not found"
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

    if (error.message === "reset_failed") {
        return response.status(404).json({
            success: false,
            message: "Reset failed! Please check your code confirm and email again"
        })
    }

    if (error.message === "code_wrong") {
        return response.status(404).json({
            success: false,
            message: "Confirm code is wrong"
        })
    }

    if (error.message === "profile_update_failed") {
        return response.status(404).json({
            success: false,
            message: "Update profile failed"
        })
    }

    if (error.message === "profile_not_found") {
        return response.status(404).json({
            success: false,
            message: "Profile not found"
        })
    }

    if (error.message === "File too large") {
        return response.status(400).json({
            success: false,
            message: "File too large!"
        })
    }

    if (error.message === "city_not_found") {
        return response.status(404).json({
            success: false,
            message: "city not found"
        })
    }

    if (error.message === "event_category_not_found") {
        return response.status(404).json({
            success: false,
            message: "event category not found"
        })
    }

    if (error.message === "wishList_not_found") {
        return response.status(404).json({
            success: false,
            message: "Error: Wishlist not found"
        })
    }

    if (error.message === "event_not_found") {
        return response.status(404).json({
            success: false,
            message: "Error: Event not found"
        })
    }

    if (error.message === "status_not_found") {
        return response.status(404).json({
            success: false,
            message: "Error: Status not found"
        })
    }
    if (error.message === "paymentMethod_not_found") {
        return response.status(404).json({
            success: false,
            message: "Error: Payment Method not found"
        })
    }

    if (error.message === "paymentMethod_not_found") {
        return response.status(404).json({
            success: false,
            message: "Error: Payment Method not found"
        })
    }
    
    console.log(error)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error"
    })
}

module.exports = errrorHendle
