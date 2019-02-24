require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs")

var axios = require("axios");
var moment = require('moment');

// Spotify info
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var requestItem = process.argv.slice(3).join(" ");

function getConcert() {
  if (!requestItem) {
    console.log("Please enter a band name");
    process.exit();
  } 
  else {
    // Then run a request with axios to the bandintown API with the movie specified
    axios.get("https://rest.bandsintown.com/artists/" + requestItem +"/events?app_id=codingbootcamp").then(
      function(response) {
        console.log("Band Name: " + requestItem.toUpperCase());
        console.log("Venue: " + response.data[0].venue.name);
        console.log("City: " + response.data[0].venue.city);
        console.log("State: " + response.data[0].venue.region);
        var time = response.data[0].datetime
        var newTime = moment(time).format("MM/DD/YYYY")
        console.log("Date: " + newTime + "\n");

        //write to log.txt file
        fs.appendFile("log.txt", "Band Name: " + requestItem.toUpperCase() + 
                      "\nVenue: " + response.data[0].venue.name +
                      "\nCity: " + response.data[0].venue.city +
                      "\nState: " + response.data[0].venue.region +
                      "Date: " + newTime + "\n\n", function(err) {
          if (err) {
            return console.log(err);
          }
        })
      }
    );
  }
}

function getSpotify() {
  if (!requestItem) {
    console.log("Please enter a song name")
  }
  else {
    spotify
      .search({ type: 'track', query: requestItem, limit: 20 })
      .then(function(response) {
          console.log("Band Name: " + response.tracks.items[0].artists[0].name);
          console.log("Album Name: " + response.tracks.items[0].album.name);
          console.log("Song Name: " + requestItem);
          console.log("Song Link: " + response.tracks.items[0].artists[0].external_urls.spotify + "\n")

          //write to log.txt file
          fs.appendFile("log.txt", "Band Name: " + response.tracks.items[0].artists[0].name + 
                        "\nAlbum Name: " + response.tracks.items[0].album.name +
                        "\nSong Name: " + requestItem +
                        "\nSong Link: " + response.tracks.items[0].artists[0].external_urls.spotify + "\n\n", function(err) {
          if (err) {
            return console.log(err);
            }
          })
        })
      .catch(function(err) {
          console.log(err);
      });
    }
  }


function getMovie() {
  // Then run a request with axios to the OMDB API with the movie specified
  var movieName = "The Maze Runner"
  var queryUrl = "http://www.omdbapi.com/?t=" + requestItem + "&y=&plot=short&apikey=" + keys.OMDB;
  console.log(requestItem)
  if (!requestItem) {
    console.log("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  }
  else {
    axios.get(queryUrl).then(
      function(response) {
        console.log("Movie Name: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("Movies Website: " + response.data.Website + "\n");

        }
      );
    }
  }


function getRandomStuff() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
        return console.log(error);
    } else {

        // split up the data in random.txt
        var newData = data.split(",");
        console.log(newData);

        request = newData[0];
        // what to look up
        requestItem = newData[1];

        if (request === "concert-this") {
          getConcert();
        }
        else if (request === "spotify-this-song"){
          getSpotify();
        }
        else if (request === "movie-this") {
          getMovie();
        }
    }
  });
  };

if (request === "concert-this") {
  getConcert();
}
else if (request === "spotify-this-song"){
  getSpotify();
}
else if (request === "movie-this") {
  getMovie();
}
else if (request === "do-what-it-says") {
  getRandomStuff();
}
else {
  console.log("PLEASE ENTER THE CORRECT INFORMATION");
  console.log(".........Restarting!!!!")
  process.exit();
}
