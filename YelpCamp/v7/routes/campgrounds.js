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

// CREATE route
router.post("/", function(req, res){
  let name = req.body.name;
  let imageUrl = req.body.image;
  let description = req.body.description;
  let newCampground = {name: name, image: imageUrl, description: description};
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

// NEW route
router.get("/new", function(req, res){
 res.render("campgrounds/new");
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

module.exports = router;
