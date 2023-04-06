const errrorHendle = (response, error)=>{
    if(error?.massage?.inculudes("duplicate key")){
        return response.status(409).json({
            success: false,
            masssage: "Error email already used!"
        })
    }
    if(error === undefined){
        return response.status(404).json({
            success: false,
            massage: "Error: user not found"
        })
    }
    return response.status(500).json({
        success: false,
        massage: "Error: Intenal server error"
    })
}

module.exports = errrorHendle
