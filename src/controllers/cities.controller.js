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
