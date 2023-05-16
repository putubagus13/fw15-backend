const errorHandler = require("../helpers/errorHandler")
const changePasswordModel = require("../model/admin/changePassword.model")
const argon = require("argon2")

exports.changePassword = async (request, response) => {
    try {
        const {id} = request.user
        const user = await changePasswordModel.findOneUserId(id)
        const {oldPassword, newPassword, confirmPassword} = request.body

        const verify = await argon.verify(user.password, oldPassword)
        if(!verify){
            throw Error("old password invalid")
        }
        if( newPassword === oldPassword){
            throw Error("Cant_same_password")
        }
        if( newPassword !== confirmPassword){
            throw Error("password_unmatch")
        }
        const data ={
            password: await argon.hash(newPassword)
        }
        const userData = await changePasswordModel.update(id, data)
        if(!userData){
            throw Error("Change_failed")
        }
        return response.json({
            success: true,
            message: "Change Password success",
            result: userData
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}
