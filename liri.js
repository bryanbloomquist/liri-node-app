require("dotenv").config();
const fs = require("fs");
var moment = require('moment');
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

const log = process.argv;

fs.appendFile("log.txt","\n"+log+"\n", function (err){
    if (err) throw err;
});

var query = process.argv[2];
var variable = process.argv.slice(3).join(" ");
console.log("query is "+query);
console.log("variable is "+variable);

runCommand();

function runCommand(){
    if (query === "concert-this"){
        concertThis(variable);
    } else if (query === "spotify-this-song"){
        spotifyThisSong(variable);
    } else if (query === "movie-this"){
        movieThis(variable);
    } else if (query === "do-what-it-says"){
        doWhatItSays(variable);
    } else {
        console.log("Command Not Known. Use 'concert-this <artist/band name>', 'spotify-this-song <song name>', 'movie-this <movie title>', or 'do-what-it-says'.")
    }
}

// CONCERT-THIS
function concertThis(variable){
    var queryURL = "https://rest.bandsintown.com/artists/" + variable + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response) {
            var concertArray = response.data;
            for (var i=0; i < concertArray.length; i++){
                var venue = concertArray[i].venue.name;
                var city = concertArray[i].venue.city;
                var region = concertArray[i].venue.region;
                var country = concertArray[i].venue.country;
                var date = moment(concertArray[i].datetime).format("MM/DD/YYYY");
                fs.appendFile("log.txt", "\n     "+venue+": "+city+", "+region+", "+country+": "+date+"\n", function (err){
                    if (err) throw err;
                });
                console.log("\n"+"Venue: "+venue);
                console.log("Location: "+city+", "+region+", "+country);
                console.log("Date: "+date);
                console.log("\n----------------------------------------")
            }
        }
    )
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

//  SPOTIFY-THIS-SONG
function spotifyThisSong(variable){
    if (!variable){
        variable = "the sign ace of base";
    }
    spotify
    .search({ type: 'track', query: variable, limit: 20})
    .then(function(response){
        var trackArray =  response.tracks.items;
        for (var i=0; i < trackArray.length; i++){
            var artist = trackArray[i].artists[0].name;
            var title = trackArray[i].name;
            var preview = trackArray[i].preview_url;
            var album = trackArray[i].album.name;
            fs.appendFile("log.txt", "\n     "+artist+"  :  "+title+"  :  "+album+"\n          "+preview+"\n", function (err){
                if (err) throw err;
            });
            console.log("\n"+"Artist: "+artist);
            console.log("Song Title: "+title);
            console.log("Album: "+album);
            console.log("Song Preview: "+preview);
            console.log("\n----------------------------------------")
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

//  MOVIE-THIS
function movieThis(variable){
    if (!variable){
        variable = "Mr Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t="+variable+"&y=&plot=short&apikey=trilogy"
    console.log(queryURL);
    axios.get(queryURL).then(
        function(response){
            var title = response.data.Title;
            var year = response.data.Year
            var imdbRating = response.data.Ratings[0].Value;
            var rottenTomatoes = response.data.Ratings[1].Value;
            var country = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;
            fs.appendFile("log.txt", "\n     "+title+"\n     "+year+"\n     "+imdbRating+"\n     "+rottenTomatoes+"\n     "+country+"\n     "+language+"\n     "+plot+"\n     "+actors+"\n", function (err){
                if (err) throw err;
            });
            console.log("\n"+"Title: "+title);
            console.log("Year: "+year);
            console.log("IMDB Rating: "+imdbRating);
            console.log("Rotten Tomatoes Rating: "+rottenTomatoes);
            console.log("Country: "+country);
            console.log("Language: "+language);
            console.log("Plot: "+plot);
            console.log("Actors: "+actors);
            console.log("\n----------------------------------------")
        }
    )
}

// DO-WHAT-IT-SAYS
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
        var dataArr = data.split(",");
        query = dataArr[0];
        variable = (dataArr.slice(1).join(" ")).replace(/['"]+/g, '');
        console.log("query is "+query);
        console.log("variable is "+variable);
        runCommand();
    })
}