const { body, query , validationResult } = require("express-validator")


const emailRules = body("email").isEmail().withMessage("Email is invalid")
const passwodRules = body("password").isStrongPassword().withMessage("Password not enough strong")
const nameRules = body("username").isLength({min:3, max:20}).withMessage("Name format invalid")
const phoneRules = body("phoneNumber").isLength({min:10, max:12}).isInt().withMessage("Your number Phone is wrong")
const searchRules = query("search").isString().withMessage("Use string to search")
const pageRules = query("page").isString().withMessage("Use Number")
const limitsRules = query("limit").isString().withMessage("Use Number") 


const rules = {
    authLogin: [emailRules, body("password").isLength({min:8}).withMessage("Password invalid")],
    ceateUser: [nameRules, emailRules, passwodRules],
    upadateUser: [nameRules],
    allUsers: [searchRules, pageRules, limitsRules],
    profileUser: [emailRules, phoneRules]
}

const validator = (request, response, next)=>{
    const errors = validationResult(request)
    try {
        if (!errors.isEmpty()){
            throw Error("error_validation")
        }
        return next()

    } catch (error) {
        return response.status(400).json({ 
            success: false,
            message: "Error Validation",
            errors: errors.array() 
        })
    }
}

const validation = (selectRules) => [rules[selectRules], validator]

module.exports = validation
