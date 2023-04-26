const categoriesModel = require("../../model/admin/categories.model")
const errorHandler = require("../../helpers/errorHandler")
const eventCategoryModel = require("../../model/admin/eventCategories.model")
const argon = require("argon2")

exports.getAllCategories = async (request,response)=>{
    try {
        const data = await categoriesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all category",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createCategories = async (request, response)=>{
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
        const categories = await categoriesModel.insert(data)
        if(!categories){
            return Error("update_failed")
        }
        const eventCategoryData = {
            categoryId: categories.id
        }
        await eventCategoryModel.insert(eventCategoryData)
        return response.json({
            success: true,
            masssage: `create ${request.body.name} category successfuly`,
            result: categories
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateCategories = async (request, response)=>{
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
        const categories = await categoriesModel.update(request.params.id, data)
        if(!categories){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update category Success!",
            results: categories
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteCategories = async (request,response)=>{
    try {
        const data = await categoriesModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete category successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await categoriesModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of category",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

