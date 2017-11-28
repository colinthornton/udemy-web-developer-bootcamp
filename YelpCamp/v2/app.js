const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp_v2", {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP =============================================
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);


// // Create a campground =============================================
// Campground.create(
// {
//   name: "Granite Hill",
//   image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
//   description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite."
// }, function(err, campground){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND:");
//     console.log(campground);
//   }
// });


// Routes =============================================
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
      res.render("index", {campgrounds: allCampgrounds});
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
 res.render("new");
});

// SHOW route
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided ID
  // Render show page with that campground
  let id = req.params.id;
  Campground.findById(id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});


// START THE SERVER =============================================
app.listen(3000, function(){
  console.log("YelpCamp is being served on port 3000!");
});
