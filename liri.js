require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);


var axios = require("axios");
var moment = require('moment');
// var inquirer = require('inquirer');
var fs = require('fs');

var inputOne = process.argv[2];
var inputTwo = process.argv.slice(3).join(" ");

var queryUrl = "http://www.omdbapi.com/?t=" + inputTwo + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

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
    //   if (!inputTwo) {
    //     inputTwo = "Mr. Nobody";
    // };
    axios.get(queryUrl).then(
      function(response) {
        if(inputTwo){
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Origin: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors); 
        } 
        else {
        console.log("Title: Mr. Nobody");
        console.log("Release Year: 2009");
        console.log("Rating: 7.8");
        console.log("Rotten Tomatoes Rating: 67%");
        console.log("Country of Origin: Belgium, Germany, Canada, France, USA, UK");
        console.log("Language: English, Mohawk");
        console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
        console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham"); 
        }
      }
    ); }

function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + inputTwo + "/events?app_id=codingbootcamp")
  .then(function(response) {
    console.log("Artist Name: " + inputTwo);
    console.log("Venue: " + response.data[0].venue.name);
    console.log("Venue location: " + response.data[0].venue.city, response.data[0].venue.region);
    console.log("date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
  })
}

  // .catch(function(error) {
  //   if (error.response) {
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //   } else if (error.request) {
  //     console.log(error.request);
  //   } else {
  //     console.log("Error", error.message);
  //   }
  //   console.log(error.config);
//   });
// }


function spotifyThisSong () {
  if (!inputTwo) {
    inputTwo = "the sign ace of base"
};
  spotify.search({ type: 'track', query: inputTwo}, function(err, data) {
    if (err) {
      return console.log('Error: ' + err);
    }
  console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
  console.log("Song: " + data.tracks.items[0].name);
  console.log("Preview link: " + data.tracks.items[0].preview_url);
  console.log("Album: " + data.tracks.items[0].album.name);
  }
  )}
  
  // function whatItSays (){
  //   fs.readFile('random.tx', 'utf8', function (err, data){
  //     if (err) throw err;
  //     var dataArr = data.split(',');
  //     if (dataArr.length == 2){
  //       pick(dataArr[0], dataArr[1]);
  //     }else if (dataArr.lenght == 1){
  //       pick(dataArr[0]);
  //     }
  //     });
  //   }