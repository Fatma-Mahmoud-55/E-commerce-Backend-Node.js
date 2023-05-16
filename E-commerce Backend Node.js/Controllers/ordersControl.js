const orderModel = require("../Models/orderModel")
const userModel=require("../Models/userModel")






// add new order
async function addOrder(req, res) {
    try {
        const newOrder = await orderModel.create(req.body);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(421).json({message:error.message});
    }
}


// update order by id 
async function updateOrder(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try{
        const updatedOrder = await orderModel.updateOne({id}, newData)
        res.status(200).json( updatedOrder);

    }catch(err){
        res.status(500).json(err.message);
    }
}


// get by id
// async function getByID(req, res) {
//     try {
//         const orderId = req.params.id;
//         const found = await orderModel.findById(orderId);
//         if (found.userId == req.userId) {
//             res.status(200).json(found);
//         } else {
//             res.status(422).json("this order not belong to you");
//         }
//     } catch (err) {
//         res.status(422).json(err);
//     }
// }



async function getByID(req, res) {
    try {
        const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.send(order);
    } catch (err) {
        res.status(422).json(err);
    }
}


// app.get('/api/orders/:id', async (req, res) => {
//     const order = await Order.findById(req.params.id).populate('products').populate('shippingAddress');
//     if (!order) return res.status(404).send('Order not found');
//     res.send(order);
//   });





//get all orders
async function getAllOrders(req, res) {

    try {
        // const allOrders = await orderModel.find({}).populate({ path: "userId", select: "firstName ,email" })
        // const allOrders = await orderModel.find({}).populate({ path: "userId", select: "firstName ,email" }).populate("products.productId");

        const allOrders = await orderModel.find({}) 
        // const finalResult = allOrders.map((item) => {

        //     return {
        //         _id: item._id,
        //         userId: item.userId,
        //         address: item.address,
        //         mobile: item.mobile,
        //     };
        // });

        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).json(err.message);
    }
}





// update order by id 
async function updateOrderByAdmin(req, res) {
    var {id} = req.params;

    var {statusEn , statusAr} = req.body;
   // const category = await catModel.findOneAndUpdate({_id:id},{catNameEn, catNameAr},{new:true});

    try{
        const updatedOrder = await orderModel.findOneAndUpdate({_id:id},{statusEn, statusAr},{new:true});
        res.status(200).json( updatedOrder);

    }catch(err){
        res.status(500).json(err.message);
    }
}






// delete by id
async function deleteById(req, res,next) {
    console.log("/////////////////////////////////////")
    console.log(req.userId)
    console.log(req.isAdmin)

    try {
        const orderId = req.params.id;
        
        const found = await orderModel.findById(orderId);
        if (found.userId == req.userId) {
            const deleteOrder = await orderModel.findByIdAndDelete(orderId);
            res.status(200).json("your order has been deleted");
        } else {
            res.status(422).json("this order not belong to you");
        }
    } catch (err) {
        res.status(422).json(err);
    }
}







module.exports = { addOrder, getByID, deleteById, getAllOrders, updateOrder, updateOrderByAdmin }