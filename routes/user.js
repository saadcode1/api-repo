const express = require("express");
const mongoose=require("mongoose");
const router=express.Router();
const passport=require("passport");
const LocalStrategy=require("passport-local");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const controller=require("../controller/user");
const isLoggedIn=require("../middlewares");

// requirng models
const User=require("../models/user");

router.get("/",controller.loginPage);
router.get("/home",isLoggedIn,controller.homePage);



// // use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(User.authenticate()));
// // use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] },
  ));

  router.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/fail' }),
  async (req, res,next) => {
    console.log(req.user)
    const { email, name, picture } = req.authInfo._json;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // User already exists, log in the user
      await req.logIn(existingUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/home"); // redirect to a protected route
      });
    } else {
      const data = new User({
        email,
        name,
        picture,
      });
      await data.save();
      await req.logIn(data, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/home"); // redirect to a protected route
      });
    }
  }
);
router.get("/fail",controller.failLogin);
  

module.exports=router;