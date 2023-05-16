
const express = require('express');
var router = express.Router();
var {createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../Controllers/categories')
const fs = require('fs')
var catModel = require('../Models/categories')




router.route('/').get(getCategories)
router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory)


router.post("/", async (req, res, next) => {
    var category = req.body
    try {
        var savedCat = await createCategory(category)
        res.status(200).json(savedCat)
    } catch (err) {
        res.json({ message: err.message })
    }
})




module.exports=router;