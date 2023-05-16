const mongoose =require("mongoose")
const{createCopouns}=require("../Controllers/copouns")
const copounsSchema=mongoose.Schema(
    {
        nameEn:{
            type:String,
            minLength:4,
            required:true
        },

        nameAr:{
            type:String,
            minLength:4,
            required:true
        },

        amount:{
            type:Number
        },

        crateria:{
            type:Number
        },
        
        descreptionEn:{
            type:String,
            required:true,
        },
        descreptionAr:{
            type:String,
            required:true,
        },
        isDeleted:{
            type:Boolean,
            default: false
        }

    },{ timestamps: true }
)
var copounsModel= mongoose.model("copouns",copounsSchema)
module.exports=copounsModel