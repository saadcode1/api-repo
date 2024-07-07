
module.exports=isLoggedIn=(req,res,next)=>{
    console.log("7th running middleware")
      if(!req.isAuthenticated()){
         return res.redirect("/")
      }
      next();
  }