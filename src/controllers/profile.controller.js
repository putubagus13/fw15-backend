// const fileRemover = require("../helpers/fileRemover.helpers")
const profileModel = require("../model/admin/profile.model")
const errorHandler = require("../helpers/errorHandler")
const userModel = require("../model/admin/users.model")

exports.updateProfile = async (request, response) => {
    try {
        const {id} = request.user
        // const user = 
        await profileModel.findOneByUserId(id)
        const data = {
            ...request.body
        }
        // if(request.file){
        //     if(user.picture){
        //         fileRemover({filename: user.picture})
        //     }
        // data.picture =  request.file.path
        data.picture = request.file.path
        const profile = await profileModel.updateByUserId(id, data)
        if(!profile){
            throw Error ("profile_update_failed")
        }
        let updateUser
        if(data.email){
            updateUser = await userModel.update(id, data)
        }else{
            updateUser = await userModel.findOne(id)
        }

        const result = {
            ...profile,
            email: updateUser?.email,
            username: updateUser?.username
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
        console.log(id)
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
