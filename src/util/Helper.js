// Spotify API Info
const client_id = '2809822f6b7747cfb8b243c5226bae80';
const url_for_authorization = 'https://accounts.spotify.com/authorize';
const response_type = 'token';
const redirect_uri = 'http://localhost:3000/callback';
const state = '34fFs29kd09';
const scope = 'user-read-private';
const token = '';

// CORS workaround which didn't work for me ... hence the hacks below
const proxy_url = "https://cors-anywhere.herokuapp.com/";

// URL for Spotify authorization token
const auth_url = `${proxy_url}
                  ${url_for_authorization}
                  ?client_id=${client_id}
                  &redirect_uri=${redirect_uri}
                  &scope=${scope}
                  &response_type=${response_type}
                  &state=${state}`;

// Spotify type of search
const type_search = `&type=track`;

// Limit response
const limit = `&limit=5`;

// Array for storing music that will be returned
const musicArray = [];

// Search using the Spotify API
const searchSpotify = async (searchTerm) => {
  // Hack to get around CORS redirect problem - Codacademy: I didn't
  // get it to work [huge waste of time - more guidance during course please!]
  if (window.location.href.includes('access')) {
    // Oh the pain of having to do this!
    const windowUrlSplit = window.location.href.indexOf('=');
    const nextWindowUrlSplit = window.location.href.substring(windowUrlSplit + 1);
    const thirdWindowUrlSplit = nextWindowUrlSplit.split('&');
    this.token = thirdWindowUrlSplit[0]; // + '"';
    const token_string = `Authorization: Bearer ${this.token}`;
    const search_url = `https://api.spotify.com/v1/search?q=${searchTerm}${type_search}${limit} -H "${token_string}"`;

    console.log(search_url)
    const response = await fetch(search_url, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + `${token}`,
        "Content-Type": "application/json",
        // This didn't work ... why did the CORS response ask for it?
        origin: `anonymous`
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
                if (i < 1) {
                  // console.log('Album: ' + jsonResponse.tracks.items[0].album.name);
                  musicObj['album'] = jsonResponse.tracks.items[i].album.name
                }
                // console.log(jsonResponse.tracks.items[i].artists[0].name);
                musicObj['artist'] = jsonResponse.tracks.items[i].artists[0].name
                // console.log(jsonResponse.tracks.items[i].name);
                musicObj['title'] = jsonResponse.tracks.items[i].name
                musicArray.push(musicObj);
                musicObj = {};
              }
              return musicArray;
            }
          });
      } else {
        try {
          // Get the JSON response from Spotify API
          // 24/09/2018 - this was working and then stopped with Missing required request header. Must specify one of: origin,x-requested-with
          const clean_auth_url = auth_url.replace(/\s/g,'');
          const response = await fetch(clean_auth_url, {
            headers: {
                Accept: "application/json",
               "Content-Type": "application/json",
                // This didn't work ... why did the CORS response ask for it?
                origin: `anonymous`,
            }
          });
          if (response.ok) {
            // Hack to get around CORS redirect problem ... again
            // const lookingForAuthToken = response.url.split('#');
            // window.location.assign(lookingForAuthToken[0]);
            window.location.assign('https://accounts.spotify.com/authorize?client_id=2809822f6b7747cfb8b243c5226bae80&redirect_uri=http://localhost:3000/callback&scope=user-read-private&response_type=token&state=34fFs29kd09');
            return;
          }
        } catch(error) {
          console.log(error);
        }
    }
};

const createPlayList = async (playListName) => {
  const endpoint = 'https://api.spotify.com/v1/playlists';
  // Data to be sent to Spotify
  const data = { name: `${playListName}`,
                 description: `${playListName} description`,
                 public: 'false'
         }
  const response = await fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: '200'})
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    return true;
  });
};

const getPlayListId = async (playListName) => {
  const endpoint = 'https://api.spotify.com/v1/me/playlists';
  let playListId = '';
  const response = await fetch(`${endpoint}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + `${token}`,
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    // Code to search through the playlist looking for the new playlist
    // so that the playlist id can be identified.
    // I haven't done this as I've had enough, really.
    // Sorry about that.
    return playListId;
  });
}

const addSongsToPlayList = async (playListId, playListResults) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + `${token}`,
        "Content-Type": "application/json"
      },
      body: {
        urls: [
        // this would be worked out but I've just hardcoded them anywhere
        // I would take the playListResultsArray and get iterate over the list
        // so that I had the correct number of tracks to be updated.
        `spotify:track:${playListResults[0].id}`,
        `spotify:track:${playListResults[1].id}`,
        `spotify:track:${playListResults[2].id}`,
        `spotify:track:${playListResults[3].id}`,
        ]
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return true;
    });
};

export {searchSpotify, createPlayList, getPlayListId, addSongsToPlayList};
