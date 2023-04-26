const fileRemover = require("../helpers/fileRemover.helpers")
const profileModel = require("../model/admin/profile.model")
const errorHandler = require("../helpers/errorHandler")
const userModel = require("../model/admin/users.model")

exports.updateProfile = async (request, response) => {
    try {
        const {id} = request.user
        const user = await profileModel.findOneByUserId(id)
        const data = {
            ...request.body
        }
        if(request.file){
            if(user.picture){
                fileRemover({filename: user.picture})
            }
            data.picture =  request.file.filename
            console.log(data.picture)
        }
        const profile = await profileModel.updateByUserId(id, data)
        if(!profile){
            throw Error ("profile_update_failed")
        }
        let updateEmail
        if(data.email){
            updateEmail = await userModel.update(id, data)
        }else{
            updateEmail = await userModel.findOne(id)
        }

        const result = {
            ...profile,
            email: updateEmail?.email
        }

        return response.json({
            success: true,
            message: "Profile updated",
            result
        }) 
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getProfile = async (request, response) => {
    try {
        const {id} = request.user
        const profile = await profileModel.findOneByUserId(id)
        if(!profile){
            throw Error("profile_not_found")
        }
        return response.json({
            success: true,
            message: "Profile",
            results: profile
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
