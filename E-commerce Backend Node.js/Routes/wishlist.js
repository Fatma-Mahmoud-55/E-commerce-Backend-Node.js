const express = require ('express');
const router = express.Router();
const { auth,isAdmin,isUser } = require("../Middleware/auth");
const {getWishlists, getWishlistById,getWishlistByUser, createWishlist} = require('../Controllers/wishlistController');

router.use(auth)

router.post('/', async (req, res) => {
    var wishlist = req.body ; 
    // wishlist.user_Id = req.userId
    console.log(req.body);
    try {
        var savedWishlist = await createWishlist(wishlist);
        res.status(200).send(savedWishlist);
    } catch (error) {
        res.status(421).send({message: error.message});
    }
}
)
// get All wishLists
// router.get('/',isAdmin,async (req,res,next)=>{
router.get('/',async (req,res,next)=>{

    
    var limit = parseInt(req.query.limit) || 10
    var skip = parseInt(req.query.skip) || 0
    try {
        var receivedWishlists = await getWishlists(limit, skip);
        res.status(200).send(receivedWishlists);
    } catch (error) {
        res.status(421).send({message: error.message});
    }

})

// get wishlist by Id
// router.get('/:id',isAdmin,async (req,res,next)=>{
router.get('/byId/:id',async (req,res,next)=>{

    var {id} = req.params;
    try {
        var receivedWishlist = await getWishlistById(id);
        res.status(200).send(receivedWishlist);
    } catch (error) {
        res.status(421).send({message: error.message});
    }

})

// get wishlist by user
// router.get('/:userId',isUser,async (req,res,next)=>{
router.get('/byUId/:userId',async (req,res,next)=>{

    var {user_Id} = req.params;
    try {
        var receivedWishlist = await getWishlistByUser(user_Id);
        res.status(200).send(receivedWishlist);
    } catch (error) {
        res.status(421).send({message: error.message});
    }

})

module.exports = router
