const errorHandler = require("../helpers/errorHandler")
const citiesModel = require("../model/admin/cities.model")

exports.getAllCities = async (request, response) => {
    try {
        let data = await citiesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "Get all cities successfully",
            results: data
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}

exports.createCities = async (request, response)=>{
    try{
        const data = {
            ...request.body
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
