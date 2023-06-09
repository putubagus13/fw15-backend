const citiesModel = require("../../model/admin/cities.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllCities = async (request,response)=>{
    try {
        const data = await citiesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all cities",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createCities = async (request, response)=>{
    try{
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }

        if(request.file){
            // data.picture = request.file.filename
            data.picture = request.file.path
        }
        const cities = await citiesModel.insert(data)
        if(!cities){
            return Error("update_failed")
        }
        
        return response.json({
            success: true,
            masssage: "create city successfuly",
            result: cities
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateCities = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
        if(request.file){
            // data.picture = request.file.filename
            data.picture = request.file.path
        }
        const cities = await citiesModel.update(request.params.id, data)
        if(!cities){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update city Success!",
            results: cities
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteCities = async (request,response)=>{
    try {
        const data = await citiesModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete city successfully",
                results: data
            })
        }
        throw Error("city_not_found")
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await citiesModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of city",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}
