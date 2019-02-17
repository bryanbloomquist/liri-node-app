require("dotenv").config();
const fs = require("fs");
var moment = require('moment');
// var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);

const log = process.argv;

fs.appendFile("log.txt", log + "\n", function (err){
    if (err) throw err;
});

const query = process.argv[2];
const variable = process.argv.slice(3).join(" ");

console.log("query is "+query);
console.log("variable is "+variable);
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


//  SPOTIFY THIS SONG

function spotifyThisSong(){

}

//  `node liri.js spotify-this-song '<song name here>'`
//      This will show the following information about the song in your terminal/bash window
//          Artist(s)
//          The song's name
//          A preview link of the song from Spotify
//          The album that the song is from
//      If no song is provided then your program will default to "The Sign" by Ace of Base.
//      You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//      The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
//          Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//          Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//          Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//          Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
// });

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//     return console.log('Error occurred: ' + err);
// }

// console.log(data); 
// });



//  `movie-this`
function movieThis(){

}

//  `node liri.js movie-this '<movie name here>'`
//      This will output the following information to your terminal/bash window:
//          Title of the movie.
//          Year the movie came out.
//          IMDB Rating of the movie.
//          Rotten Tomatoes Rating of the movie.
//          Country where the movie was produced.
//          Language of the movie.
//          Plot of the movie.
//           Actors in the movie.
//      If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      It's on Netflix!
//      You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


//  http://www.omdbapi.com/?i=tt3896198&apikey=6cdee2e8





//  `do-what-it-says`
function doWhatItSays(){

}
//  `node liri.js do-what-it-says`
//      Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      Edit the text in random.txt to test out the feature for movie-this and concert-this.





// CONCERT THIS ((DONE))

function concertThis(variable){
    var queryURL = "https://rest.bandsintown.com/artists/" + variable + "/events?app_id=codingbootcamp"
    axios
    .get(queryURL).then(
        function(response) {
            var concertArray = response.data;
            for (var i=0; i < concertArray.length; i++){
                var venue = concertArray[i].venue.name;
                var city = concertArray[i].venue.city;
                var region = concertArray[i].venue.region;
                var country = concertArray[i].venue.country;
                var date = moment(concertArray[i].datetime).format("MM/DD/YYYY");
                fs.appendFile("log.txt", "     "+venue+": "+city+", "+region+", "+country+": "+date+"\n", function (err){
                    if (err) throw err;
                });
                console.log("Venue "+i+"")
                console.log(venue);
                console.log(city+", "+region+", "+country);
                console.log(date);
                console.log("-----------------------------------------")
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