// const { request, response } = require("express")
const userModel = require("../models/users.model")
const errrorHendle = require("../helpers/errorHandler")
const argon = require("argon2")

exports.getAllUsers = async (request,response)=>{
    try {
        const data = await userModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all users",
            results: data
        })
    } catch (error) {
        return errrorHendle(response, error)
    }
}

exports.createUser = async (request, response)=>{
    try{
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }

        if(request.file){
            data.picture = request.file.filename
        }
        const user = await userModel.insert(data)
        if(!user){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: `create user ${request.body.email} successfuly`,
            result: user
        })
    }catch(error){
        return errrorHendle(response, error)
    }
}

exports.updateUser = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
        // if(request.file){
        //     data.picture = request.file.filename
        // }
        const user = await userModel.update(request.params.id, data)
        if(!user){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update Success!",
            results: user
        })
    } catch (error) {
        return errrorHendle(response,error)
    }
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
