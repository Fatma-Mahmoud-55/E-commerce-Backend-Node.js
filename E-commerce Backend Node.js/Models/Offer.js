const mongoose = require('mongoose');

const offersSchema = mongoose.Schema({


    nameEn: {
        type: 'string',
        minLength: 5,
        maxLength: 100,
        unique: true,
        required: true,
        trim: true
    },
    nameAr: {
        type: 'string',
        minLength: 5,
        maxLength: 100,
        unique: true,
        required: true,
        trim: true
    },
    amount: {
        type: 'number',
        // required: true
    },
    crateria: {
        type: 'number',
        // required: true
    },
    descriptionEn: {
        type: 'string',
        trim: true,
        required: true
    },
    descriptionAr: {
        type: 'string',
        trim: true,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default: false
    }

}, { timestamps: true })

const offersModel = mongoose.model('Offers', offersSchema);


module.exports = offersModel;