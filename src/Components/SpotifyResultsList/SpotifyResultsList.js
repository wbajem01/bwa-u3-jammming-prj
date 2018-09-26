import React from 'react';

import SpotifyTrack from '../../Components/SpotifyTrack/SpotifyTrack';

import './SpotifyResultsList.css';

class SpotifyResultsList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        ADD_TRACK: '+'
      };
  }

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="TrackList">
          {
            this.props.songs.map(song => {
              return <SpotifyTrack song={song}
                                   update={this.props.update}
                                   action={this.state.ADD_TRACK}
                                   key={song.id} />
            })
          }
        </div>
      </div>
    );
  }
}

export default SpotifyResultsList;
