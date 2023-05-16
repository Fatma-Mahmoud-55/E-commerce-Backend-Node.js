const copounsModel=require("../Models/copouns")


function createCopouns(copouns){
  return copounsModel.create(copouns)
}

function getAllcopouns(){
  return copounsModel.find()
}

module.exports={createCopouns,getAllcopouns}