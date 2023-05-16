const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    products:[{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
        quantity: { type: Number, default: 1 },
    }],
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        // required: true,
    },
    shippingAddressEn:{
        type:String,
        required:true
    },
    shippingAddressAr:{
        type:String,
        required:true
    },
    cityEn:{
        type:String,
        required: true
    },
    cityAr:{
        type:String,
        required: true
    },
    countryEn:{
        type:String,
        required: true
    },
    countryAr:{
        type:String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    statusEn:{
        type: String,
        required: true,
        enum: ["Pending", "Inprogress", "Done"],
        default:"Pending"
    },
    statusAr:{
        type: String,
        required: true,
        enum: ["قيد الإنتظار", "قيد التقدم", "تم بنجاح"],
        default:"قيد الإنتظار"
    },
    totalPrice:{
        type:Number,
        required: true
    },
    cartId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Cart'
    }  ,

    isDeleted:{
        type:Boolean,
        default: false
    }

}, { timestamps: true })



var orderModel = mongoose.model("Orders",orderSchema)

module.exports=orderModel