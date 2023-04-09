// const { request, response } = require("express")
const userModel = require("../models/users.model")
const errrorHendle = require("../helpers/errorHandler")

exports.getAllUsers = async (request,response)=>{
    const data = await userModel.findAll()
    return response.json({
        success: true,
        massage: "List of all users",
        results: data
    })
}

exports.createUser = async (request, response)=>{
    try{
        const data = await userModel.insert(request.body)  
        return response.json({
            success: true,
            masssage: `create user ${request.body.email} successfuly`,
            result: data
        })
    }catch(error){
        return errrorHendle(response, error)
    }
}

exports.updateUser = async(request, response)=>{
    const data= await userModel.update(request.params.id, request.body)
    if(data){
        return response.json({
            success: true,
            massage: "Update user successfully",
            results: data
        })
    }
    errrorHendle(response, data)
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
    errrorHendle(response, data)
}

exports.deleteUser = async (request,response)=>{
    const data = await userModel.destroy(request.params.id)
    if(data){
        return response.json({
            success: true,
            massage: "Delete user successfully",
            results: data
        })
    }
    errrorHendle(response, data)
}

