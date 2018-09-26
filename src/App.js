import React from 'react';

import SpotifySearchForm from './Components/SpotifySearchForm/SpotifySearchForm';
import SpotifyResultsList from './Components/SpotifyResultsList/SpotifyResultsList';
import SpotifyPlayList from './Components/SpotifyPlayList/SpotifyPlayList';

import {searchSpotify, createPlayList, getPlayListId, addSongsToPlayList} from './util/Helper';

import './App.css';
import './index.css';

const exampleSongs = [
  { id: '4VqPOruhp5EdPBeR92t6lQ',
    album: 'The Resistance',
    artist: 'Muse',
    title: 'Uprising' },
  { id: '3lPr8ghNDBLc2uZovNyLs9',
    album: 'Black Holes And Revelations',
    artist: 'Muse',
    title: 'Supermassive Black Hole' },
  { id: '3skn2lauGk7Dx6bVIt5DVj',
    album: 'Black Holes',
    artist: 'Muse',
    title: 'Starlight' },
  { id: '4PrlkCGa3bBmU7QIboyxII',
    album: 'The Dark Side',
    artist: 'Muse',
    title: 'The Dark Side' },
  ];


class App extends React.Component {
  constructor(props) {
      super(props);
      /*Both arrays in state will contain music objects with the following structure
        {
          id: <value>,
          album: <value>,
          artist: <value>,
          title: <value>,
        }
      */
      this.state = {
        searchResults: [],
        playListResults: [],
      };

      this.addToPlayListResults = this.addToPlayListResults.bind(this);
      this.removeFromPlayListResults = this.removeFromPlayListResults.bind(this);
      this.updatePlayList = this.updatePlayList.bind(this);
  }

  addToPlayListResults(returnedMusic) {
    this.setState({
        playListResults: [...this.state.playListResults, returnedMusic]
    }, () => {
      console.log(this.state.searchResults);
    });
  }

  removeFromPlayListResults(returnedMusic) {
    for (let i = 0; i < (this.state.playListResults).length; i++) {
      if (returnedMusic.id == (this.state.playListResults)[i].id) {
        const tempArray = (this.state.playListResults);
        tempArray.splice(i, 1);
        this.setState({
          playListResults: tempArray
        }, () => {
          console.log(this.state.playListResults)
        });
      }
    }
  }

  updatePlayList(playlistName) {
    const playListCreateSuccess = createPlayList(this.playListName);
    if (playListCreateSuccess) {
      const playListId = getPlayListId(this.playListName);
      if (playListId) {
        addSongsToPlayList(playListId, this.state.playListResults);
      } else {
        throw new Error('Request failed!');
      }
    } else {
      throw new Error('Request failed!');
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <div className="App-search">
            <SpotifySearchForm update={this.addToPlayListResults}/>
          </div>
          <div className="App-playlist">
              <SpotifyResultsList songs={exampleSongs} update={this.addToPlayListResults} />
              <SpotifyPlayList playListSongs={this.state.playListResults}
                               update={this.removeFromPlayListResults}
                               saveplaylist={this.updatePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
