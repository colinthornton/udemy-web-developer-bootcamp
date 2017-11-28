const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

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
router.get("/new", middleware.isLoggedIn, function(req, res){
 res.render("campgrounds/new");
});

// CREATE route
router.post("/", middleware.isLoggedIn, function(req, res){
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

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      req.flash("error", "Could not find campground.");
      res.redirect("back");
    } else {
      res.render("campgrounds/edit", {campground: foundCampground});
    }
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
