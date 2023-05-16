const express = require('express');
var router = express.Router();
const{getAllOffers, getOfferById, createOffer, updateOffer , deleteOffer}= require('../Controllers/offers');
const { findByIdAndUpdate } = require('../Models/userModel');

// get All Offers
router.get('/',async (req,res,next)=>{
    
    var limit = parseInt(req.query.limit) || 10
    var skip = parseInt(req.query.skip) || 0
    try {
        var receivedOffers = await getAllOffers(limit, skip);
        offers = receivedOffers.filter((offer) => {
            return (!offer.isDeleted)
        })
        if (offers.length === 0 ){
            res.send("No offers")
        }
        res.status(200).send(offers);
    } catch (error) {
        res.status(421).send({message: error.message});
    }

})

// get offer by Id
router.get('/:id',async (req,res,next)=>{
    var {id} = req.params;
    try {
        var receivedOffer = await getOfferById(id);
        if(!receivedOffer.isDeleted){
            res.status(200).send(receivedOffer);
        }else{
            res.send("no Offers found")
        }
    } catch (error) {
        res.status(421).send({message: error.message});
    }

})

// create new offer
router.post('/',async (req,res,next)=>{
    var offer = req.body;
    try {
        var savedOffer = await createOffer(offer);
        res.status(200).send(savedOffer);
    } catch (error) {
        res.status(421).send({message: error.message});
    }
})

router.patch('/:id',async (req,res,next)=>{
    var offer = req.body;
    var {id} = req.params;
    try {
        var updatedOffer = await updateOffer(id,offer);
        res.status(200).send(updatedOffer);
    } catch (error) {
        res.status(421).send({message: error.message});
    }
})

router.delete('/:id',async (req,res,next)=>{
    var {id} = req.params
    var offer = req.body
    offer.isDeleted = true
    try {
        var deletedOffer = await deleteOffer(id,offer);
        if(!deletedOffer || deletedOffer.isDeleted){
            res.status(404 ).json({msg: `no offer for this id ${id}`})
        }else{
            res.status(200).json("Offer Deleted");
        }
    } catch (error) {
        res.status(421).send({message: error.message});
    }
})



module.exports = router;