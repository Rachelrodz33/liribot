require("dotenv").config();

//add keys
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require ("request");
var bandsintown = require('bandsintown')("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");




const command = process.argv[2];
const secondCommand = process.argv[3];

switch (command) {
    case ('spotify-this-song'):
        if(secondCommand){
            spotifyThisSong(secondCommand);
         } else{
            spotifyThisSong("My Heart Will Go On");
         }
    break;
    case ('movie-this'):
        if(secondCommand){
            omdb(secondCommand);
        } else{
            omdb("Crazy, Stupid, Love.");
        }
    break;
    case ('do-what-it-says'):
         doWhatItSays();
    break;
    default:
        console.log('Try again');
};



//spotify-this-song

function spotifyThisSong(song){
    spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
        if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
                      //artist
            console.log("Artist: " + songData.artists[0].name);
                      //song name
            console.log("Song: " + songData.name);
                      //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
                      //album name
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");
            } 
        } else {
        console.log('Error occurred.');
        }
    });
}

//movie-thisnpm inst

    function omdb(movie){
        var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
      
        request(omdbURL, function (error, response, body){
          if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
      
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            
          } else{
            console.log('Error occurred.')
          }
          if(movie === "Mr. Nobody"){
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

          }
        });
        
    }

//concert-this
var bandsintown = require('bandsintown')(APP_ID);
 
bandsintown
  .getArtistEventList('Skrillex')
  .then(function(events) {
    // return array of events
  });
  
//do-what-it-says

      function doWhatItSays(){
        fs.readFile('random.txt', "utf8", function(error, data){
          var txt = data.split(',');
      
          spotifyThisSong(txt[1]);
        });
      }
//make liri 




