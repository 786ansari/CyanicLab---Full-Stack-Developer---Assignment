const mongoose = require("mongoose")
const db = require("../dbconfig/dbconfig")

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    emailAddress:{
        type:String
    },
    homeAddress:{
        type:Array
    },
    dateOfEmployment:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
      }
})

var User = mongoose.model('users', userSchema);
module.exports = {User}