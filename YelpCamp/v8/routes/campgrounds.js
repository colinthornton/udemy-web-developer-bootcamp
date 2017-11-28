const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// INDEX route
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// NEW route
router.get("/new", isLoggedIn, function(req, res){
 res.render("campgrounds/new");
});

// CREATE route
router.post("/", isLoggedIn, function(req, res){
  let name = req.body.name;
  let imageUrl = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = {name: name, image: imageUrl, description: description, author: author};
  Campground.create(newCampground, function(err, campground){
      if(err){
        console.log(err);
      } else {
        console.log("CAMPGROUND ADDED TO DB:");
        console.log(campground);
        res.redirect("/campgrounds");
      }
    }
  );
});

// SHOW route
router.get("/:id", function(req, res){
  let id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
