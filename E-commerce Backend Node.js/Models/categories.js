const mongoose = require('mongoose');


const categorieSchema = mongoose.Schema({
    catNameEn:{
        type:String,
        required:[true, 'Category required'],
        unique:[true, 'Category must be unique'],
        minLength:5,
        maxLength:20,
    },
    catNameAr:{
        type:String,
        required:[true, 'Category required'],
        unique:[true, 'Category must be unique'],
        minLength:5,
        maxLength:20,
    },
    // A and B => shopping.com/a-and-b

    // slugEn:{
    //     type:String,
    //     lowercase: true,
    // },
    // slugAr:{
    //     type:String,
    //     lowercase: true,
    // }

}, {timestamps: true});


const categorieModel = mongoose.model('categories', categorieSchema);

module.exports = categorieModel;
