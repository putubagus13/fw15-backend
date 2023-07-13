const wishListModel = require("../model/admin/wishlist.model")
const errorHendler = require("../helpers/errorHandler")

exports.getAll = async (request, response)=>{
    try {
        const data = await wishListModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "List of all wishlist",
            results: data
        })

    } catch (error) {
        return errorHendler(response, error)
    }

}
exports.createWishList = async (request, response)=>{
    try{
        const data = {
            ...request.body,
            userId: request.user.id
        }
        const wishList = await wishListModel.insert(data)
        if(!wishList){
            return Error("wishlist_failed")
        }
        return response.json({
            success: true,
            masssage: "create wishList successfuly",
            results: wishList
        })
    }catch(error){
        return errorHendler(response, error)
    }
}

exports.getOneWishlist = async (request, response)=>{
    try {
        const wishList = await wishListModel.findOneWishlist(request.params.id)
        if(!wishList){
            return response.json({
                success: false,
                message: "wishlist not found",
            })
        }
        return response.json({
            success: true,
            message: "wishlist Detail",
            results: wishList
        })

    } catch (error) {
        return errorHendler(response,error)
    }
}


exports.getDetailWishlist = async (request, response)=>{
    try {
        console.log(request.params.id)
        const wishList = await wishListModel.findOneByUserId(request.params.id)
        if(!wishList){
            throw Error("wishList_not_found")
        }
        return response.json({
            success: true,
            message: "wishlist Detail",
            results: wishList
        })

    } catch (error) {
        return errorHendler(response,error)
    }
}

exports.deleteWishList = async (request,response)=>{
    try {
        const data = await wishListModel.destroy(request.params.id)
        if(!data){
            throw Error("wishList_not_found")
        }
        return response.json({
            success: true,
            massage: "Delete wishlist successfully",
            resultss: data
        })
    } catch (error) {
        return errorHendler(response, error)
    }
  
}

