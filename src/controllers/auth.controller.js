const errorHendle = require("../helpers/errorHandler")
const userModel = require("../model/admin/users.model")
const profileModel = require("../model/admin/profile.model")
const reservationModel = require("../model/admin/reservations.model")
const forgotRequestModel = require("../model/admin/forgotRequest.model")
const wishListModel = require("../model/admin/wishlist.model")
const jwt = require("jsonwebtoken")
const {APP_SECRET}= process.env
const argon = require("argon2")


exports.login = async (request, response)=>{
    try {
        const {email, password} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("wrong_credentials")
        }
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw Error("wrong_credentials")
        }
        const token = jwt.sign({id:user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Login Success!",
            results: token
        })
    } catch (error) {
        return errorHendle(response, error)
    }
}

exports.register = async (request, response)=>{
    try {
        const {fullName, password, confirmPassword }= request.body
        if( password !== confirmPassword){
            throw Error("password_unmatch")
        }
        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.insert(data)
        const profileData = {
            fullName, 
            userId: user.id
        }
        
        const reservationData = {
            userId: user.id
        }

        const wishListData = {
            userId: user.id
        }
        await profileModel.insert(profileData)
        await reservationModel.insert(reservationData)
        await wishListModel.insert(wishListData)
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Register Success!",
            results: (token)
        })
    } catch (error) {
        return errorHendle(response,error)
    }
}

exports.forgotRequest = async(request, response)=>{
    try {
        const {email} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("not_user")
        }
        const randomNumber = Math.random()
        const rounded = Math.round(randomNumber * 1000)
        const padded = String(rounded).padEnd(6, "0")

        const forgot = await forgotRequestModel.insert({
            email: user.email,
            code: padded
        })
        if(!forgot){
            throw Error("forgot_failed")
        }
        return response.json({
            success: true,
            message: "Request resets passwod success"
        })
    } catch (error) {
        return errorHendle(response, error)
    }
}

exports.resetPassword = async (request, response) =>{
    try {
        const {code, email, password} = request.body
        const find = await forgotRequestModel.findOneByEmail(email)
        console.log(find.code)
        if(!find){
            throw Error("Reset_failed")
        }
        if(code !== find.code){
            throw Error("code_wrong")
        }
        const selectedUser = await userModel.findOneByEmail(email)
        const data ={
            password: await argon.hash(password)
        }

        const user = await userModel.update(selectedUser.id, data)
        if(!user){
            throw Error("Reset_failed")
        }
        return response.json({
            success: true,
            message: "Reset password success"
        })
    } catch (error) {
        return errorHendle(response,error)
    }
}
