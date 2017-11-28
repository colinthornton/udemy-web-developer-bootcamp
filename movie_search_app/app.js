const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.render('search');
});

app.get('/results', function(req, res){
  let query = req.query.search;
  let url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      const data = JSON.parse(body)
      if (data["Response"] === "False"){
        res.render("no_results");
      } else {
        res.render("results", {data: data});
      }
    }
  })
});

app.listen(3000, function(){
  console.log("Now serving your movie app on port 3000!");
});
