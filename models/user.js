const express=require("express");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    picture:{
        type:String,
    }
})

module.exports=mongoose.model("User",userSchema);