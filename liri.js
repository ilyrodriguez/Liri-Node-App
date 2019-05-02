require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');

var fs = require('fs');
var colors = require('colors');

var inputOne = process.argv[2];
var inputTwo = process.argv.slice(3).join(" ");
var divider = "\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n";

function runThis() {
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
}
runThis();

function movieThis() {
  if (!inputTwo) {
    inputTwo = "Mr. Nobody";
  };
  var queryUrl = "http://www.omdbapi.com/?t=" + inputTwo + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
      if (inputTwo) {

        var movieData = "     Movie Title: ".bold.yellow + "\n" + "       " + response.data.Title + "\n" + "     Release Year: ".bold.yellow + "\n" + "       " + response.data.Year + "\n" + "     Rating: ".bold.yellow + "\n" + "       " + response.data.imdbRating + "\n" + "     Rotten Tomatoes Rating: ".bold.yellow + "\n" + "       " + response.data.Ratings[1].Value + "\n" + "     Country of Origin: ".bold.yellow + "\n" + "       " + response.data.Country + "\n" + "     Language: ".bold.yellow + "\n" + "       " + response.data.Language + "\n" + "     Movie Plot: ".bold.yellow + "\n" + "       " + response.data.Plot + "\n" + "     Actors: ".bold.yellow + "\n" + "       " + response.data.Actors;

  
        console.log("\n" + ("|~~~~~~~~~~~~~~~~~~~~".bold.yellow + "  MOVIE THIS   ".bold.bgYellow + "~~~~~~~~~~~~~~~~~~~~~~~~|".bold.yellow) + "\n" + movieData);
      }
    }
  );
}

function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + inputTwo + "/events?app_id=codingbootcamp")
    .then(function (response) {

      var concertData = "     Artist Name: ".bold.cyan + "\n" + "       " + inputTwo + "\n" + "     Venue: ".bold.cyan + "\n" + "       " + response.data[0].venue.name + "\n" + "     Venue Location: ".bold.cyan + "\n" + "       " + response.data[0].venue.city + ", " + response.data[0].venue.region + "\n" + "     Date of the Concert: ".bold.cyan + "\n" + "       " + moment(response.data[0].datetime).format("MM/DD/YYYY");

      fs.appendFile("log.txt", concertData + divider, function (err) {
        if (err) throw err;

      console.log("\n" + ("|~~~~~~~~~~~~~~~~~~~~".bold.cyan + "  CONCERT THIS   ".bold.bgCyan + "~~~~~~~~~~~~~~~~~~~~~~~~|".bold.cyan) + "\n" + concertData);
    })
  })
}

function spotifyThisSong() {
  if (!inputTwo) {
    inputTwo = "the sign ace of base"
  };
  spotify.search({
    type: 'track',
    query: inputTwo
  }, function (err, data) {
    if (err) {
      return console.log('Error: ' + err);
    }

    var musicData = "     Artist Name: ".bold.green + "\n" + "       " + data.tracks.items[0].artists[0].name + "\n" + "     Name of the Song: ".bold.green + "\n" + "       " + data.tracks.items[0].name + "\n" + "     Preview Link: ".bold.green + "\n" + "       " + data.tracks.items[0].preview_url + "\n" + "     Name of the Album: ".bold.green + "\n" + "       " + data.tracks.items[0].album.name;

    fs.appendFile("log.txt", musicData + divider, function (err) {
      if (err) throw err;

      console.log("\n" + ("|~~~~~~~~~~~~~~~~~~".bold.green + "  SPOTIFY THIS SONG   ".bold.bgGreen + "~~~~~~~~~~~~~~~~~~~~~~|".bold.green) + "\n" + musicData);
    })
  })
}

function whatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    console.log("\n" + "             |~~~~~~".rainbow.bold + " WHAT IT SAYS IS...".rainbow.bold + "~~~~~~|".rainbow.bold);
    var dataArray = data.split(",");
    inputOne = dataArray[0];
    inputTwo = dataArray[1];
    runThis();
  })
}
