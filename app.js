if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
const express =require("express");
const mongoose=require("mongoose");
const app=express();
const port=8888;
const session = require('express-session');
const passport=require("passport");

const GoogleStrategy=require("passport-google-oauth20").Strategy;
const User=require("./models/user.js")

// mongooDb connection
main()
     .then(()=>{
        console.log("connections successfully done");
     })
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp_clone');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

require("./auth.js");
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 
const path = require("path");

const engine=require("ejs-mate");
const { profile } = require('console');
app.engine('ejs', engine);
app.set("view engine", "ejs");

// requiring Routes
const userRoute=require("./routes/user.js");

app.set("views", path.join(__dirname, "/views"));
app.use(session({
  secret: process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/",userRoute);








// app.get("/auth/home",(req,res)=>{
//   let user=req.email;
//   console.log(user);
//   res.render("home.ejs");
// })

// middleware to check if user is logged in
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/fail');
// }

app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})