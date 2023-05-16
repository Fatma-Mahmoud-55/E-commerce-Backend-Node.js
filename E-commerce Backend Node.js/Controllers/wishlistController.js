const wishlistModel = require('../Models/wishlist')

function createWishlist(wishlist){
    return wishlistModel.create(wishlist);
}

function getWishlists(limit , skip){
    return wishlistModel.find().limit(limit).skip(skip)
} 

function getWishlistById(id){
    return wishlistModel.findById(id)
} 

function getWishlistByUser(userId){
    return wishlistModel.find({user_Id :userId})
} 


module.exports ={getWishlists, getWishlistById,getWishlistByUser, createWishlist }