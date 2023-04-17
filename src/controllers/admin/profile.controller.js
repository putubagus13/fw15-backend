const profileModel = require("../../models/profile.model")
const errorHendle = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllProfile = async (request,response)=>{
    try {
        const data = await profileModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all users profile",
            results: data
        })
    } catch (error) {
        return errorHendle(response, error)
    }
}

exports.createProfile = async (request, response)=>{
    try{
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }

        // if(request.file){
        //     data.picture = request.file.filename
        // }
        const profile = await profileModel.insert(data)
        if(!profile){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create profile successfuly",
            result: profile
        })
    }catch(error){
        return errorHendle(response, error)
    }
}

exports.updateProfile = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
      
        const profile = await profileModel.update(request.params.id, data)
        if(!profile){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update Success!",
            results: profile
        })
    } catch (error) {
        return errorHendle(response,error)
    }
}

exports.deleteProfile = async (request,response)=>{
    try {
        const data = await profileModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete profile successfully",
                results: data
            })
        }
    } catch (error) {
        errorHendle(response, error)
    }
   
}

exports.getOneUser = async (request,response)=>{
    try {
        const data = await profileModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of category",
                results: data
            })
        }
    } catch (error) {
        errorHendle(response, error)
    }
  
}
