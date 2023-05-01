const historysModel = require("../../model/admin/historys.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllHistory = async (request,response)=>{
    try {
        const data = await historysModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all History section",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createHistory = async (request, response)=>{
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
        const history = await historysModel.insert(data)
        if(!history){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create History successfuly",
            result: history
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateHistory = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
      
        const wishList = await historysModel.update(request.params.id, data)
        if(!wishList){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update history Success!",
            results: wishList
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteHistory = async (request,response)=>{
    try {
        const data = await historysModel.destroy(request.params.id)
        if(!data){
            throw Error("history_not_found")
        }
        return response.json({
            success: true,
            massage: "Delete history successfully",
            results: data
        })
    } catch (error) {
        errorHandler(response, error)
    }
  
}

exports.getOne = async (request,response)=>{
    try {
        const data = await historysModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of history",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }

}

