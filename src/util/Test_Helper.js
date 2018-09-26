/*

This code is used to test the Spotify API
It works but ... the same code doesn't work in the
Jamming app.

Running this code using Node.js from the command line gives the following
results:

[
  { id: '4VqPOruhp5EdPBeR92t6lQ',
    album: 'The Resistance',
    artist: 'Muse',
    title: 'Uprising' },
  { id: '3lPr8ghNDBLc2uZovNyLs9',
    artist: 'Muse',
    title: 'Supermassive Black Hole' },
  { id: '3skn2lauGk7Dx6bVIt5DVj',
    artist: 'Muse',
    title: 'Starlight' },
  { id: '4PrlkCGa3bBmU7QIboyxII',
    artist: 'Muse',
    title: 'The Dark Side' },
  { id: '7ouMYWpwJ422jRcDASZB7P',
    artist: 'Muse',
    title: 'Knights Of Cydonia' }
  ];

*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Spotify API Info
const client_id = '2809822f6b7747cfb8b243c5226bae80';
const url_for_authorization = 'https://accounts.spotify.com/authorize';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/callback';
const state = '34fFs29kd09';
const scope = 'user-read-private';

// CORS workaround which didn't work for me ... hence the hacks below
const cors = 'https://cors-anywhere.herokuapp.com/';

// URL for Spotify authorization token
const auth_url = `${url_for_authorization}
                  ?client_id=${client_id}
                  &redirect_uri=${redirect_uri}
                  &scope=${scope}
                  &response_type=${response_type}
                  &state=${state}`;

// Spotify type of search
const type_search = `&type=track`;

// Limit response
const limit = `&limit=5`;

// Search using the Spotify API
const searchSpotify = async (searchTerm) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}${type_search}${limit}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer BQBrQIQg6n8HyOzIkHUnDN1i5444WjuN_goM3ZMruIeL4FK57LbfFJS03nO1zXiTK1lvv0RG8DsrgHT7rQ4UMSrDChdJjzLwSxtccp49bj-F9HOO6rkWd_sCMIr69Dato0YZ1Jo6uDmIDr7M2bwOMzP7gld2vcy5ST3bzSW-zahtbp2TV1qYsg",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        if (jsonResponse.tracks) {
          let musicArray = [];
          let musicObj = {};
          for (let i = 0; i < jsonResponse.tracks.items.length; i++) {
            // console.log(jsonResponse.tracks.items[i].id);
            musicObj['id'] = jsonResponse.tracks.items[i].id
            // console.log('Album: ' + jsonResponse.tracks.items[0].album.name);
            musicObj['album'] = jsonResponse.tracks.items[i].album.name
            // console.log(jsonResponse.tracks.items[i].artists[0].name);
            musicObj['artist'] = jsonResponse.tracks.items[i].artists[0].name
            // console.log(jsonResponse.tracks.items[i].name);
            musicObj['title'] = jsonResponse.tracks.items[i].name
            musicArray.push(musicObj);
            musicObj = {};
          }
          console.log(musicArray);
          return musicArray;
        }
      });
};

let musicReturned = null;

var searchMusicPromise = new Promise(function(resolve, reject) {
  musicReturned = searchSpotify('muse');
  let goodResult = true;
  if (goodResult) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

searchMusicPromise.then(function(result) {
  console.log(musicReturned);
 });
