import React from 'react';

import SpotifyTrack from '../../Components/SpotifyTrack/SpotifyTrack';
import SpotifySave from '../../Components/SpotifySave/SpotifySave';

import './SpotifyPlayList.css';

class SpotifyPlayList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        REMOVE_TRACK: '-',
        value: 'New Playlist',
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let track;
    if (this.props.playListSongs != '') {
      track = this.props.playListSongs.map(song => {
          return <SpotifyTrack song={song}
                               update={this.props.update}
                               action={this.state.REMOVE_TRACK}
                               key={song.id} />});
    }
      return(
        <div className="Playlist">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            <div className="TrackList">
            {track}
          </div>
            <SpotifySave playListName={this.state.value} saveplaylist={this.props.saveplaylist}/>
        </div>
      );
   }
}

export default SpotifyPlayList;
