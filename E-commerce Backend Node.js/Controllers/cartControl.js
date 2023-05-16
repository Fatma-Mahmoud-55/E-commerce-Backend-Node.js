const CartModel = require("../Models/cartModel");




// get
async function getCart(req, res) {

    try {
        const cart = await CartModel.find({ user: req.userId }).populate("product", "Images Price  ");

        const finalResult = cart.map((item) => {
            return {
                _id: item._id,
                userId: item.userId,
                product: {
                    // EXAMPLE................................
                    _id: item.product._id,
                    images: item.product.Images,
                    price: item.product.Price,

                    //.............................................
                },
                quantity: item.quantity,
            };
        });

        res.status(200).json(finalResult);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

// update 
async function updateQuantity(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try {
        const updated = await CartModel.findByIdAndUpdate(id, newData);
        res.status(200).json(updated);
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}


// GET CART BY USER ID
async function getCartByUserID(req, res) {
    try {
        const cart = await CartModel.find({ user: req.params.id }).populate("product", "itemName Images Price   Color");
        res.status(200).json(cart);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}



// ADD
async function addToCart(req, res) {
    try {
        const product = req.body;
        const found = await CartModel.findOne({ user: req.userId, product: req.body.product });
        if (found) {
            const update = await CartModel.findOneAndUpdate({ user: req.userId, product: req.body.product }, product);
            res.status(201).json(update);
        } else {
            req.body.user = req.userId;
            const savedProduct = await CartModel.create(product);
            res.status(201).json(savedProduct);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// DELETE
async function deleteFromCart(req, res) {
    try {
        const deletedCart = await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCart);
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
}

module.exports = { getCart, getCartByUserID, addToCart, deleteFromCart, updateQuantity };
