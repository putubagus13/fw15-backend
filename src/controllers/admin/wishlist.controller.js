const wishListModel = require("../../models/wishlist.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllWishList = async (request,response)=>{
    try {
        const data = await wishListModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all wishlist section",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createWishList = async (request, response)=>{
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
        const wishList = await wishListModel.insert(data)
        if(!wishList){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create wishList successfuly",
            result: wishList
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateWishList = async (request, response)=>{
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
        const wishList = await wishListModel.update(request.params.id, data)
        if(!wishList){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update wishList Success!",
            results: wishList
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteWishList = async (request,response)=>{
    try {
        const data = await wishListModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete wishlist successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOneUser = async (request,response)=>{
    try {
        const data = await wishListModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of wish list",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
  
}
