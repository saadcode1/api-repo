if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
let authenticated = false;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile,email, cb) => {
  if (authenticated) {
    return cb(null, profile); // already authenticated, return early
  }
  authenticated = true;
  console.log('Authentication successful!');
  return cb(null, profile,email);
}));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

