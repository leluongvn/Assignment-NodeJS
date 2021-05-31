const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name:{
        type :String
    },
    typeProduct:{
        type:String 
    },
    price:{
        type :Number
    },
    imageProduct:{
        type:String
    },
    detail:{
        type:String
    }

})
const Product =mongoose.model('Product',ProductSchema)
module.exports = Product