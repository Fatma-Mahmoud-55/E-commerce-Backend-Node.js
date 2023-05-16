const mongoose = require("mongoose")
const ProdutsSchema = mongoose.Schema({
////////////////add rating item

    review: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Review" //from controller
    },
    offer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Offers"
    },
    Categorie: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "categories"
    },

    ItemNameEn: {
        type: String,
        required:true
    },
    ItemNameAr: {
        type: String,
        required:true
    },
    Price: {
        type: Number,
        required:true
    },
    BrandEn: {
        type: String,
        required:true
    },
    BrandAr: {
        type: String,
        required:true
    },
    ColorEn: {
        type: String
    },
    Graphics:{
        type: String
    },
    Display:{
        type: String
    },
    OperatingSystem:{
        type: String
    },
    Keyboard:{
        type: String
    },
    ColorAr: {
        type: String
    },
    OnSale: {
        type: Boolean
    },
    PriceOnSale: {
        type: Number
    },
    Storage: {
        type: String
    }, 
    
    DetailsEn: {
        type: String
    },
    DetailsAr: {
        type: String
    },
    DescriptionEn: {
        type: String,
        required:true
    },
    DescriptionAr: {
        type: String,
        required:true
    },
    Images: [{
        type: String
    }],
    // Images : { type : Array , "default" : [] }
    Capacity: {
        type: String
    },
    Interface: {
        type: String
    },
    Connector: {
        type: String
    },
    CompatibilityAr: {
        type: String
    },
    CompatibilityEn: {
        type: String
    },
    workWithAr: {
        type: String
    },
    workWithEn: {
        type: String
    },
    laptopCompartmentAr: {
        type: String
    },
    laptopCompartmentEn: {
        type: String
    },
    MaterialAr: {
        type: String
    },
    MaterialEn: {
        type: String
    },
    powerSourceAr: {
        type: String
    },
    powerSourceEn: {
        type: String
    },
    SeriesEn: {
        type: String
    },
    SeriesAr: {
        type: String
    },
    Weight: {
        type: String
    },
    Dimensions: {
        type: String
    },
    Wattage: {
        type: String
    },
    outputWattage: {
        type: String
    },
    ConnectorAr: {
        type: String
    },
    ConnectorEn: {
        type: String
    },
    TypeEn: {
        type: String
    },
    TypeAr: {
        type: String
    },
    CompatibleDevicesAr: {
        type: String
    },
    CompatibleDevicesEn: {
        type: String
    },
    SpecialFeatureEn: {
        type: String
    },
    SpecialFeatureAr: {
        type: String
    },
    connectivityTechnologyEn: {
        type: String
    },
    connectivityTechnologyAr: {
        type: String
    },
    compatiblePhoneModelsEn: {
        type: String
    },
    compatiblePhoneModelsAr: {
        type: String
    },
    specialFeatureEn: {
        type: String
    },
    specialFeatureAr: {
        type: String
    },
    inputVoltage: {
        type: String
    },
    Amperage: {
        type: String
    },
    totalUspPorts: {
        type: String
    },
    mountingType: {
        type: String
    },
    itemHardness: {
        type: String
    },
    finishTypeEn: {
        type: String
    },
    finishTypeAr: {
        type: String
    },
    unitCount: {
        type: String
    },
    screenSize: {
        type: String
    },
    itemWeight: {
        type: String
    },
    weightLimit: {
        type: String
    },
    maximumHeight: {
        type: String
    },
    tripodHeadType: {
        type: String
    },
    foldedSize: {
        type: String
    },
    brandMaterialTypeEn: {
        type: String
    },
    brandMaterialTypeAr: {
        type: String
    },
    memoryRam: {
        type: String
    },
    internalStorage: {
        type: String
    },
    Network: {
        type: String
    },
    ProcessorEn: {
        type: String
    },
    ProcessorAr: {
        type: String
    },
    Battery: {
        type: String
    },
    realCamera: {
        type: String
    },
    numberOfBatteries: {
        type: String
    },
    batteryAverageLifeStandby: {
        type: String
    },
    areBatteriesIncluded: {
        type: String
    },
    areBatteriesRequired: {
        type: String
    },
    plugFormat: {
        type: String
    },
    inputVoltage: {
        type: String
    },
    outputVoltage: {
        type: String
    },
    totalPowerOutlets: {
        type: String
    },
    includedComponents: {
        type: String
    },
    isDeleted:{
        type:Boolean,
        default: false
    }, 
    ratings:[{
        star: Number,
        postedBy:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"
        }

    }]

}, { timestamps: true }) //timestamps add createdAt updatedAt

const ProdutsModel = mongoose.model("Products", ProdutsSchema) //create collection

module.exports = ProdutsModel