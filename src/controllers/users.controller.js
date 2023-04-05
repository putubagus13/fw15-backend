// const { request, response } = require("express")
const userModel = require("../models/users.model")

exports.getAllUsers = async (request,response)=>{
    const data = await userModel.findAll()
    return response.json({
        success: true,
        massage: "List of all users",
        results: data
    })
}

exports.createUser = (request, response)=>{
    return response.json({
        success: true,
        masssage: `create user ${request.body.fullname} successfuly`
    })
}

exports.updateUser = (request, response)=>{
    return response.json({
        success: true,
        massage: `Update user ${request.params.id} success`
    })
}

exports.deleteUser = (request,response)=>{
    return response.json({
        success: true,
        massage: `Delete user ${request.params.id} successfully`
    })
}
