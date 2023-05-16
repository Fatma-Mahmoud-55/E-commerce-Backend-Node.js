
const expressAsyncHandler = require('express-async-handler');
// const fs = require('fs');
// const slugify = require('slugify');
const catModel=require("../Models/categories")



// @desc: get all category
// @route: GET /category
// @access: puplic

exports.getCategories = expressAsyncHandler(async(req , res) => {

        // const page =req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 4;
        // const skip = (page - 1)* limit;
        //const categories = await catModel.find({}).skip(skip).limit(limit);
        const categories = await catModel.find({});
        res.status(200 ).json({results: categories.length, data: categories})
        //res.status(200 ).json({results: categories.length,page, data: categories})

});



// @desc: GET specific category
// @route: GET /category/:id
// @access: puplic


exports.getCategory = expressAsyncHandler(async(req , res) => {
        var {id} = req.params;
        const category = await catModel.findById(id);
        if(category.isDeleted){
                res.status(404 ).json({msg: `no category for this id ${id}`})
        }else{
        res.status(200 ).json({data:category})
}
});


// @desc: create specific category
// @route: POST /category
// @access: private





//Create a new category
// exports.createCategory = expressAsyncHandler(async(req , res) => {
//         var {catNameEn, catNameAr} = req.body.catNameEn;
//         const category = await catModel.create({catNameEn, catNameAr});
//         res.status(200).json({data:category})
// });




exports.createCategory = (category) =>{
        return catModel.create(category);
      }





// @desc: update specific category
// @route: PUT /category/:id
// @access: private


exports.updateCategory = async(req , res) => {
        var {id} = req.params;

        var {catNameEn , catNameAr} = req.body;
        const category = await catModel.findOneAndUpdate({_id:id},{catNameEn, catNameAr},{new:true});

        if(!category){
                res.status(404 ).json({msg: `no category for this id ${id}`})
        }else{
        res.status(200 ).json("category updated succefully")
        }
};


// @desc: delete specific category
// @route: DELETE /category/:id
// @access: private


exports.deleteCategory = expressAsyncHandler(async(req , res) => {
        var {id} = req.params;
        const category = await catModel.findByIdAndDelete(id);
        if(!category){
                res.status(404 ).json({msg: `no category for this id ${id}`})
        }else{
                res.status(200).json({msg: "this category is deleted successfully"})
        }
        res.status(200).json({msg: "this category is deleted successfully"})
        res.status(200).json(category)
});
// module.exports={createCategory};




