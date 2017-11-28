const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Root route
router.get("/", function(req, res){
  res.render("landing");
});

// Register form route
router.get('/register', function(req, res){
  res.render('register');
});

// Handle signup logic
router.post('/register', function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "You have successfully signed up, " + user.username + ".");
      res.redirect("/campgrounds");
    });
  });
});

// Show login form
router.get("/login", function(req, res){
  res.render('login');
});

// Handling login logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You have been logged out.");
  res.redirect('/campgrounds');
});

// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
