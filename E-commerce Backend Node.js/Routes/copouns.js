const express=require("express");
const { createCopouns ,getAllcopouns} = require("../Controllers/copouns");
var router = express.Router();


router.post("/", async function (req, res) {
    var copouns= req.body
    createCopouns(copouns).then((copoun=>{
        res.status(201).json(copoun)
    })).catch((err=>{
        res.status(422).json({message:err})
    }))
});

//////////////////////////////////////////////////////////////////////////////////////////////get

router.get("/",async(req,res)=>{
    try{
        var copouns= await getAllcopouns()
        res.status(200).json(copouns)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

module.exports=router