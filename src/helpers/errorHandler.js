const errrorHendle = (response, error)=>{
    if(error?.massage?.inculudes("duplicate key")){
        return response.status(409).json({
            success: false,
            masssage: "Error email already used!"
        })
    }
    // if(error?.massage?.inculudes("empty_faild")){
    //     return response.status(400).json({
    //         success: false,
    //         massage: "Error: Email or Password cant be empty"
    //     })
    // }

    // if(error?.massage?.inculudes("format_wrong")){
    //     return response.status(400).json({
    //         success: false,
    //         massage: "Error: Email wrong!"
    //     })
    // }

    if(error === undefined){
        return response.status(404).json({
            success: false,
            massage: "Error: user not found"
        })
    }

    console.log(error)
    return response.status(500).json({
        success: false,
        massage: "Error: Intenal server error"
    })
}

module.exports = errrorHendle
