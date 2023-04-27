const wishListModel = require("../model/admin/wishlist.model")
const errorHendler = require("../helpers/errorHandler")
const userModel = require("../model/admin/users.model")

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
            result: data
        })

    } catch (error) {
        return errorHendler(response, error)
    }

}

exports.updateWishlist = async (request, response) =>{
    try {
        const {id} = request.user
        const user = await userModel.findOne(id)
        if(!user){
            throw Error("update_failed")
        }
        const data = await wishListModel.updateByUserId(id, request.body)
        response.json({
            success: true,
            message: "Wishlist success update",
            result: data
        })

    } catch (error) {
        return errorHendler(response,error)
    }
}

exports.getByUserId = async (request, response)=>{
    try {
        const {id} = request.user
        const wishList = await wishListModel.findOneByUserId(id)
        if(!wishList){
            throw Error("wishlist_not_found")
        }
        return response.json({
            success: true,
            message: "wishlist",
            result: wishList
        })

    } catch (error) {
        return errorHendler(response,error)
    }
}

