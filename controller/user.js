const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const User=require("../models/user");

module.exports.loginPage=(req,res)=>{
   
        res.render("googleApi.ejs");
}
module.exports.homePage=async (req,res)=>{
       let userData= await User.find({});
       console.log(userData);
        res.render("home.ejs",{userData});
 }
module.exports.failLogin=(req,res)=>{
    res.send("something went wrong!");
  }