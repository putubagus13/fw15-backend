const eventCategoriesModel = require("../model/admin/eventCategories.model")
const errorHandler = require("../helpers/errorHandler")

exports.updateEventCategory = async (request, response) => {
    try {
        const data = {
            ...request.body
        }
        const eventCategories = await eventCategoriesModel.update(request.params.id, data)
        if(!eventCategories){
            throw Error("event_category_not_found")
        }
        return response.json({
            success: true,
            message: "Events update success",
            results: eventCategories
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
