const express = require("express");
const {  mongoose } = require("mongoose");
const db = require("../dbconfig/dbconfig");
const {User} = require("../modules/user.module");
const  Validation  = require("./validations/user.validation");
const router = express.Router();

router.post("/add-user", async(req, res) => {
    let error = Validation(req.body)
    if(error){
     return res.send({status:false,message:error})
    }
  const addUser = new User({
        name:req.body.name,
        emailAddress: req.body.email,
        dateOfEmployment: req.body.Date_of_employment,
        dateOfBirth: req.body.dob,
        mobileNumber: req.body.mobileNumber,
        homeAddress: req.body.homeAddress
  })
  await addUser.save().then((result,err)=>{
    if(err){
        res.send({status:false,message:"Error Occured",data:result})
    }
    else{
        res.send({status:true,message:"data inserted"})
    }
  })

});
router.get("/get-users/:index",async(req,res)=>{
    let Index = req.params.index
    let skipValue = (Index-1)*10
    // res.send({message:"Users not found",status:false})
   await User.find().skip(skipValue)
   .limit(10).then((result,err)=>{
        if(err){
            res.send({message:"Users not found",data:err,status:false})
        }
        else{
            res.send({message:"Users found successfully",data:result,status:true})
        }
    })
})
router.post("/update-user",async(req,res)=>{
    let error = Validation(req.body)
    if(error){
     return res.send({status:false,message:error})
    }
    const Id =  mongoose.Types.ObjectId(req.body._id)
    let update = {
        name:req.body.name,
        emailAddress: req.body.email,
        dateOfEmployment: req.body.Date_of_employment,
        dateOfBirth: req.body.dob,
        mobileNumber: req.body.mobileNumber,
        homeAddress: req.body.homeAddress
    }
    User.updateOne({_id:mongoose.Types.ObjectId(req.body._id)},{$set:update}).then((result,err)=>{
        if(err){
            res.send({message:"Users not update",data:err,status:false})
        }
        else{
            res.send({message:"Users update successfully",status:true})
        }
    })
})
router.post("/delete-user",async(req,res)=>{
    const Id =  mongoose.Types.ObjectId(req.body._id)
    User.deleteOne({_id:Id}).then((result,err)=>{
        if(err){
            res.send({message:"Users not deleted",data:err,status:false})
        }
        else{
            res.send({message:"Users deleted successfully",status:true})
        }
    })
})

module.exports = router;