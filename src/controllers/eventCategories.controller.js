const eventCategoriesModel = require("../model/admin/eventCategories.model")
const errorHandler = require("../helpers/errorHandler")

exports.getEventCategories = async (request, response) => {
    try {
        const eventCategories = await eventCategoriesModel.findOneByIdParams(request.params.id)
        if(!eventCategories){
            throw Error("event_category_not_found")
        }
        return response.json({
            success: true,
            message: "Events",
            results: eventCategories
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
