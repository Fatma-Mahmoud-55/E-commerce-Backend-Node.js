const express = require('express');
var router = express.Router();
const{getAllReviews, getReviewById, createReview, updateReview , deleteReview}= require('../Controllers/reviews')

// get All reviews
router.get('/',async (req,res,next)=>{
    
    var limit = parseInt(req.query.limit) || 10
    var skip = parseInt(req.query.skip) || 0
    try {
        var receivedReviews = await getAllReviews(limit, skip);
        var listedReviews =receivedReviews.filter((review) => {
            return (!review.isDeleted);
        })
        if (listedReviews.length === 0 ){
            res.send("No Reviews")
        }else{
            res.status(200).json(listedReviews);
        }
    } catch (error) {
        res.status(421).json({message: error.message});
    }

})

// get review by Id
router.get('/:id',async (req,res,next)=>{
    var {id} = req.params;
    try {
        var receivedReview = await getReviewById(id);
        if(!receivedReview.isDeleted){
        res.status(200).json(receivedReview)
        }else{
            res.send("no review found")
        }
    } catch (error) {
        res.status(421).json({message: error.message});
    }

})

// create new review
router.post('/',async (req,res,next)=>{
    review = req.body;
    try {
        var savedReview = await createReview(review);
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(421).json({message: error.message});
    }
})

router.patch('/:id',async (req,res,next)=>{
    review = req.body;
    var {id} = req.params;
    try {
        var updatedReview = await updateReview(id,review);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(421).json({message: error.message});
    }
})

router.delete('/:id',async (req,res,next)=>{
    var {id} = req.params
    var review = req.body
    review.isDeleted = true;
    try {
        var deletedReview = await deleteReview(id, review);
        if(!deletedReview || deletedReview.isDeleted){
            res.status(404 ).json({msg: `no review for this id ${id}`})
        }else{
            review.isDeleted = true;
            res.status(200).json({message : "review deleted successfully"});
        }
        
    } catch (error) {
        res.status(421).json({message: error.message});
    }
})



module.exports = router;