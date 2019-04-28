require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
moment().format();

var action = process.argv[2];
var input = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

switch (action) {
    case "concert-this":
    concertThis();
    break;
    
    case "spotify-this-song":
    spotifyThisSong();
    break;
    
    case "moviethis":
    movieThis();
    break;
    
    case "dowhatitsays":
    whatItSays();
    break;
    }

function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
  .then(function(response) {
    console.log("something anything!");
    console.log(response.VenueData);
    console.log("still trying");
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

// function spotifyThis(song){

// 	//If user has not specified a song , default to "the sign" Ace of Base
// 	if(song === ""){
// 		song = "The sign";
// 	}

// 	spotify.search({ type: 'track', query: song}, function(err, data) {
//     if (err) {
//         console.log('Error occurred: ' + err);
//         return;
//     }})}