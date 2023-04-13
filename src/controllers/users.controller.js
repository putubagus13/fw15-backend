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
        // if(request.body.email === "" || request.body.password ==="" ||request.body.name ===""){
        //     throw Error("empty_failed")
        //     // return response.status(400).json({
        //     //     success: false,
        //     //     massage: "Error: Name, Email or Password cant be empty"  
        //     // })
        // }
        // if(!request.body.email.includes("@")){
        //     throw Error("format_wrong")
        //     // return response.status(400).json({
        //     //     success: false,
        //     //     massage: "Error: Email format is wrong"
        //     // })
        // }
        // if(request.body.password.length < 8){
        //     return response.status(400).json({
        //         success: false,
        //         massage: "Password must have 8 caracter"
        //     })
        // }

        // if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g.test(request.body.password)){
        //     return response.status(400).json({
        //         success: false,
        //         massage: "Enter numbers, uppercase and lowercase letters for the password"
        //     })
        // }
        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const user = await userModel.insert(data)
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
        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const user = await userModel.update(request.params.id, data)
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

