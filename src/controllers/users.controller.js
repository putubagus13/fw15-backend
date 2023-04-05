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

exports.createUser = async (request, response)=>{
    const data = await userModel.insert(request.body)  
    return response.json({
        success: true,
        masssage: `create user ${request.body.email} successfuly`,
        result: data
    })
}

exports.updateUser = async(request, response)=>{
    const data= await userModel.update(request.params.id, request.body)
    return response.json({
        success: true,
        massage: "Update user successfully",
        results: data
    })
}
 

exports.getOneUser = async (request,response)=>{
    const data = await userModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            massage: "Detail users",
            results: data
        })
    }
    return response.status(404).json({
        success: false,
        massage: "Error user not found",
    })
}

exports.deleteUser = async (request,response)=>{
    const data = await userModel.destroy(request.params.id)
    return response.json({
        success: true,
        massage: "Delete user successfully",
        results: data
    })
}

