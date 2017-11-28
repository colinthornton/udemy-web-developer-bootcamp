// Config ===============================================
const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Campground  = require("./models/campground"),
      seedDB      = require("./seeds"),
      Comment     = require("./models/comment"),
      passport    = require('passport'),
      LocalStrategy = require('passport-local'),
      User        = require('./models/user');

mongoose.connect("mongodb://localhost/yelp_camp_v6", {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Seed the database =====================================
seedDB();

// PASSPORT CONFIGURATION =========================
app.use(require('express-session')({
  secret: "Once again Ian is the best person in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
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
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// ===========
// AUTH ROUTES
// ===========

app.get('/register', function(req, res){
  res.render('register');
});

app.post('/register', function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// Show login form
app.get("/login", function(req, res){
  res.render('login');
});

//login route
app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/campgrounds');
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


// START THE SERVER =============================================
app.listen(3000, function(){
  console.log("YelpCamp is being served on port 3000!");
});
