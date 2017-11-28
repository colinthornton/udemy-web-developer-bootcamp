const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image: "https://farm9.staticflickr.com/8101/8459388585_ee1642356e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores exercitationem, provident nisi dolor officiis quos eos iure minima commodi non asperiores deleniti earum laudantium tenetur repellat illum officia quaerat minus."
  },
  {
    name: "Desert Mesa",
    image: "https://farm3.staticflickr.com/2520/3769690044_55c8566a36.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat ipsum rem sint, quae sapiente beatae possimus nostrum ratione accusamus provident illum, consequatur itaque! Reiciendis corrupti magnam voluptates, quae soluta at."
  },
  {
    name: "Canyon Floor",
    image: "https://farm3.staticflickr.com/2468/3577259438_ac0272b873.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eaque provident ipsum pariatur ut illum soluta velit beatae, dolore ad dolorem nobis quos corrupti tenetur quas reprehenderit, eveniet neque odit!"
  }
];

function seedDB(){
  // Remove all campground
  Comment.remove({}, function(err){});
  console.log("Removed all comments!");
  console.log("=====================");
  Campground.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // }
    // console.log("Removed all campgrounds!");
    // console.log("========================");
    // // Add a few campgrounds
    // data.forEach(function(seed){
    //   Campground.create(seed, function(err, campground){
    //     if(err){
    //       console.log(err);
    //     } else {
    //       console.log("Added this campground:");
    //       console.log(campground);
    //       Comment.create(
    //         {
    //           text: "This place is great, but I wish there was Internet.",
    //           author: "Homer"
    //         }, function(err, comment){
    //         if(err){
    //           console.log(err);
    //         } else {
    //           campground.comments.push(comment);
    //           campground.save();
    //           console.log("Created new comment:");
    //           console.log(comment);
    //         }
    //       });
    //       console.log("========================");
    //     }
    //   });
    // });
  });
  // Add a few comments/reviews
}

module.exports = seedDB;

