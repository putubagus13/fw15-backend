const { body, query, param,validationResult } = require("express-validator")
const fs = require("fs")


const emailRules = body("email").optional().isEmail().withMessage("Email is invalid")
const passwodRules = body("password").optional().isStrongPassword().withMessage("Password not enough strong")
const username = body("username").optional().isLength({min:3, max:20}).withMessage("Name format invalid")
const phoneRules = body("phoneNumber").optional().isLength({min:10, max:12}).isInt().withMessage("Your number Phone is wrong")
const searchRules = query("search").optional().isString().withMessage("Use string to search")
const pageRules = query("page").optional().isString().withMessage("Use Number")
const limitsRules = query("limit").optional().isString().withMessage("Use Number") 

const name = body("name").optional().isLength({min:3, max:20}).withMessage("Name category invalid")
const eventId = body("eventId").optional().toInt().isInt().withMessage("Must input number Event id")
const userId = query("userId").optional().toInt().isInt().withMessage("Must input number User Id")
const categoryId = body("categoryId").optional().toInt().isInt().withMessage("Must input number Category Id")
const Idparams = param("id").optional().toInt().toInt().isInt().withMessage("Id invalid")
const limit = query("limit").optional().toInt().isInt().withMessage("input number limit is invalid ")
const page = query("page").optional().toInt().isInt().withMessage("input number page is invalid ")
const sortBy = query("sortBy").optional().isIn("ASC", "DESC").withMessage("Sort type is invalid! Choose: ASC/DESC")
const title = body("title").optional().isLength({min:3, max:20}).withMessage("Title invalid")
const date = body("date").optional().isDate("YYYY-MM-DD").withMessage("Date Invalid")
const cityId = body("eventId").optional().toInt().isInt().withMessage("Must input number city id")
const desciption = body("name").optional().isLength({min:3, max:225}).withMessage("Name category invalid")
const fullName = body("fullName").optional().isLength({min:3, max:20}).withMessage("Full name format invalid")
const phoneNumber = body("fullNumbe").optional().isInt().withMessage("Phone number is invalid ")
const gender = body("gender").optional().isBoolean().withMessage("Gender is invalid! Use 1 for fimale and 0 for male")
const profession = body("profession").optional().isLength({min:3, max:50}).withMessage("Profession is invalid")
const nationality = body("nasionality").optional().isLength({min:3, max:50}).withMessage("Nasionality is invalid")
const birthDate = body("birthDate").optional().isDate("YYYY-MM-DD").withMessage("Date Invalid")
const price = body("price").optional().isLength({min:3, max:20}).withMessage("Price is invalid")
const resevationId = body("resevationId").optional().toInt().isInt().withMessage("Must input number reservation id")
const sectionId = body("sectionId").optional().toInt().isInt().withMessage("Must input number section id")
const quantity = body("quantity").optional().toInt().isInt().withMessage("Input quantity is invalid")
const status = body("status").optional().toInt().isInt().withMessage("Must input number section id")
const paymentMethodId = body("paymentMethodId").optional().toInt().isInt().withMessage("Input quantity is invalid")



const rules = {
    authLogin: [emailRules, body("password").isLength({min:8}).withMessage("Password invalid")],
    ceateUser: [username, emailRules, passwodRules],
    upadateUser: [username, Idparams, passwodRules],
    getUser: [page, limit, sortBy],
    deleteUser: [Idparams],
    allUsers: [searchRules, pageRules, limitsRules],
    profileUser: [emailRules, phoneRules],
    
    createCategories: [name],
    getAllcategories: [page, limit, sortBy],
    updateCategories: [Idparams, name],
    deleteCategories: [Idparams],
    getDetail: [Idparams],

    createCities: [name],
    getAllCities: [page, limit, sortBy],
    updateCities: [Idparams, name],
    deleteCities: [Idparams],

    createEventCategories: [eventId, categoryId],
    getAllEventCategories: [page, limit, sortBy],
    updateEventCategories: [Idparams, eventId, categoryId],
    deleteEventCategories: [Idparams],

    createEvent: [title, date, cityId, desciption],
    getAllEvent: [page, limit, sortBy],
    updateEvent: [Idparams, title, date, cityId, desciption],
    deleteEvent: [Idparams],

    createProfile: [fullName, phoneNumber, gender, profession, nationality, birthDate],
    getAllProfile: [page, limit, sortBy],
    updateProfile: [Idparams, fullName, phoneNumber, gender, profession, nationality, birthDate],
    deleteProfile: [Idparams],

    createPartners: [name],
    getAllPartners: [page, limit, sortBy],
    updatePartners: [Idparams, name],
    deletePartners: [Idparams],

    createPayment: [name],
    getAllPayment: [page, limit, sortBy],
    updatePayment: [Idparams, name],
    deletePayment: [Idparams],

    createReservationSection: [name, price],
    getAllReservationSection: [page, limit, sortBy],
    updateReservationSection: [Idparams, name, price],
    deleteReservationSection: [Idparams],

    createReservationStatus: [name],
    getAllReservationStatus: [page, limit, sortBy],
    updateReservationStatus: [Idparams, name],
    deleteReservationStatus: [Idparams],

    createReservationTicket: [resevationId, sectionId, quantity],
    getAllReservationTicket: [page, limit, sortBy],
    updateReservationTicket: [Idparams, resevationId, sectionId, quantity],
    deleteReservationTicket: [Idparams],

    createWishList: [eventId, userId],
    getAllWishList: [page, limit, sortBy],
    updateWishList: [Idparams, eventId, userId],
    deleteWishList: [Idparams],

    createReservation: [eventId, userId, status, paymentMethodId],
    getAllReservation: [page, limit, sortBy],
    updateReservation: [Idparams, eventId, userId, status, paymentMethodId],
    deleteReservation: [Idparams],

}

const validator = (request, response, next)=>{
    const errors = validationResult(request)
    try {
        if(request.file){
            const filename = `upload/${request.file.filename}`
            fs.unlink(filename, (err)=>{
                console.log(err)
            })
        }
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
