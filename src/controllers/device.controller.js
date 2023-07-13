const errorHandler = require("../helpers/errorHandler")
const deviceTokenModel = require("../model/admin/deviceToken.model")

exports.saveToken = async (requset, response) => {
    try {
        const {id} = requset.user
        const {token} = requset.body
        const dataToken = await deviceTokenModel.findOne(token)
        if(dataToken){
            await deviceTokenModel.update(token, id)
        }else{
            await deviceTokenModel.insertToken(id, {token})
        }
        return response.json({
            success: true,
            message: "insert token success",
            results: {
                token
            }
        })
    } catch (error) {
        errorHandler(response, error)
    }
}
