const errorHandler = require("../helpers/errorHandler")
const categoriesModel = require("../model/admin/categories.model")

exports.getAllCategories = async (request, response) => {
    try {
        let data = await categoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "Get all categories successfully",
            results: data
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
