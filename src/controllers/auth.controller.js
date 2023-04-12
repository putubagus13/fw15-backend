const errorHendle = require("../helpers/errorHandler")
const userModel = require("../models/users.model")
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
        const verify = argon.verify(user.password, password)
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
        const {password, confirmPassword }= request.body
        if( password !== confirmPassword){
            throw Error("password_unmatch")
        }
        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.insert(data)
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
