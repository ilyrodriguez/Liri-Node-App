require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var inquirer = require('inquirer');
var fs = require('fs');

moment().format();

var inputOne = process.argv[2];
var inputTwo = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + inputTwo + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

// function theSwich ()
switch (inputOne) {
    case "concert-this":
    concertThis();
    break;
    
    case "spotify-this-song":
    spotifyThisSong();
    break;
    
    case "movie-this":
    movieThis();
    break;
    
    case "do-what-it-says":
    whatItSays();
    break;
    }

    function movieThis() { 
    axios.get(queryUrl).then(
      function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Origin: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors); 
      }
    ); }

function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + inputTwo + "/events?app_id=codingbootcamp")
  .then(function(response) {
    console.log("something anything!");
    console.log("Artist Name: " + inputTwo);
    console.log(response.venue);
    // console.log("still trying");
    // console.log(response.venue.datetime);
    // console.log(response.venue.city + ", "+ venue.region + "; " + venue.country);
    // console.log("still trying");
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

  // function whatItSays (){
  //   fs.readFile('random.tx', 'utf8', function (err, data){
  //     if (err) throw err;
  //     var dataArr = data.split(',');
  //     if (dataArr.length == 2){
  //       pick(dataArr[0], dataArr[1]);
  //     }else if (dataArr.lenght ==1){
  //       pick(dataArr[0]);
  //     }
  //     });
  //   }
  
