const mongoose = require("mongoose")

const beerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },

    type: {
        type: String,
        required:true,
    },

    origin: {
        type: String,
        required:true,
    },
    alcohol: {
        type: String,
        required:true,
    },

    rating: {
        type: String,
        required:true,
    },
     description: {
        type: String,
        required:true,
    },




    
})


module.exports = mongoose.model("Beer", beerSchema)
