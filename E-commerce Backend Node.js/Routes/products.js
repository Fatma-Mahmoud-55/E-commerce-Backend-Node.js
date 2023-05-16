const express = require("express");
var {
  createProduct,
  updateProductById,
  getAll,
  gettAllById,
  deleteProductById,
  gettAllByCat,
  gettAllByOffer,
  gettAllByReview,
  getAllbylimit
} = require("../Controllers/products");
var router = express.Router();
const ProductsModel = require("../Models/products");

//get all
router.get("/", async (req, res, next) => {
  var limit = parseInt(req.query.limit) || null;
  var skip = parseInt(req.query.skip) || 0;
  try {
    var Products = await getAll(limit, skip);

    var listedProducts = Products.filter((product) => {
      return !product.isDeleted;
    });
    if (listedProducts.length === 0) {
      res.send("No Products");
    } else {
      res.status(200).json(listedProducts);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});
//get all limits
router.get("/bylimit",async (req, res, next) => {
    var limit = parseInt(req.query.limit) || 10
    var skip = parseInt(req.query.skip)     || 0
    try{
        var Products=  await getAllbylimit(limit,skip)
        res.status(200).json(Products)
    }catch(err){
        res.json({message:err.message})
    }
})

//get by id
router.get("/:id", async (req, res, next) => {
  var { id } = req.params;
  try {
    var Product = await gettAllById(id);
    if (!Product.isDeleted) {
      res.status(200).json(Product);
    } else {
      res.send("no product found");
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});
//prod count
// router.get("/count", async (req, res, next) => {
//     var { id } = req.params
//     try{
//         var Products=  await gettAllById(id)
//         res.status(200).json(Products)
//     }catch(err){
//         res.json({message:err.message})
//     }
// })

//get by cat
router.get("/Categories/:id", async (req, res, next) => {
  var { id } = req.params;
  try {
    var Products = await gettAllByCat(id);
    res.status(200).json(Products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//get prod by offer
router.get("/Offers/:id", async (req, res, next) => {
  var { id } = req.params;
  try {
    var Products = await gettAllByOffer(id);
    res.status(200).json(Products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// get prod by review
router.get("/Reviews/:id", async (req, res, next) => {
  var { id } = req.params;
  try {
    var Products = await gettAllByReview(id);
    res.status(200).json(Products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//update
router.patch("/:id", async (req, res, next) => {
  var id = req.params.id;
  var product = req.body;
  try {
    var updatedProdutcs = await updateProductById(id, product);
    res.json(updatedProdutcs);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//delete
router.delete("/:id", async (req, res, next) => {
  var id = req.params.id;
  var product = req.body;
  product.isDeleted = true;
  try {
    var deleteProduct = await deleteProductById(id, product);
    // deleteProduct.isDeleted = true;
    if (!deleteProduct || deleteProduct.isDeleted) {
      res.status(404).json({ msg: `no product for this id ${id}` });
    } else {
      res.status(200).json(deleteProduct);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

//add create
router.post("/", async (req, res, next) => {
  var product = req.body;
  try {
    var savedProduct = await createProduct(product);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
