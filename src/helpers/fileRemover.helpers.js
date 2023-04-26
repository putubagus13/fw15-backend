const fs = require("fs")

const fileRemover = (file) => {
    if(file){
        const filename = `uploads/${file.filename}`
        fs.unlink(filename, (error)=> {
            if(error){
                throw Error(error.message)
            }
        })
    }
}

module.exports = fileRemover
