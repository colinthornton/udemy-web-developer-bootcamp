const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
  { name: "Salmon Creek",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
  { name: "Granite Hill",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  { name: "Mount Goat's Rest",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
  { name: "Salmon Creek",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
  { name: "Granite Hill",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  { name: "Mount Goat's Rest",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
  { name: "Salmon Creek",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
  { name: "Granite Hill",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  { name: "Mount Goat's Rest",image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"}
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  let name = req.body.name
  let imageUrl = req.body.image
  let newCampground = {name: name, image: imageUrl};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
 res.render("new");
});

app.listen(3000, function(){
  console.log("YelpCamp is being served on port 3000!");
});
