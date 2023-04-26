const errorHandler = require("../helpers/errorHandler")
const partnersModel = require("../model/admin/partners.model")

exports.getAllPartners = async (request, response) => {
    try {
        let data = await partnersModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "Get all partners successfully",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}
