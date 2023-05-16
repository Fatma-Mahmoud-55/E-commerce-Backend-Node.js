const mongoose = require ('mongoose')

const wishlistSchema = mongoose.Schema({
    products:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Product",
        required: true
    }],
    user_Id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        // required:true
    },
}, {timestamps : true})

const wishlistModel = mongoose.model('Wishlist', wishlistSchema);

module.exports =  wishlistModel;