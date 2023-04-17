const partnerModel = require("../../models/partners.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllPartner = async (request,response)=>{
    try {
        const data = await partnerModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all Partners",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createPartner = async (request, response)=>{
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
        const partner = await partnerModel.insert(data)
        if(!partner){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create Partner successfuly",
            result: partner
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updatePartner = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const partner = await partnerModel.update(request.params.id, data)
        if(!partner){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update Partner Success!",
            results: partner
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deletePartner = async (request,response)=>{
    try {
        const data = await partnerModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete Partner successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response,error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await partnerModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail users",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}
