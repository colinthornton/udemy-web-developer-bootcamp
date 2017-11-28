// Config ===============================================
const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Campground  = require("./models/campground"),
      seedDB      = require("./seeds"),
      Comment     = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_v4", {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Seed the database =====================================
seedDB();


// Campground Routes =============================================
app.get("/", function(req, res){
  res.render("landing");
});

// INDEX route
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
  // Below is oldway, accessing an array with the campgrounds defined in it
  // res.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE route
app.post("/campgrounds", function(req, res){
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
  //// Old way using hardcoded array
  // campgrounds.push(newCampground);
  // res.redirect("/campgrounds");
});

// NEW route
app.get("/campgrounds/new", function(req, res){
 res.render("campgrounds/new");
});

// SHOW route
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided ID
  // Render show page with that campground
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

// =====================================
// Comments Routes
// =====================================

// Comments New Route
app.get("/campgrounds/:id/comments/new", function(req, res){
  // Find campground by ID and send it through
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments Create Route
app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});


// START THE SERVER =============================================
app.listen(3000, function(){
  console.log("YelpCamp is being served on port 3000!");
});
