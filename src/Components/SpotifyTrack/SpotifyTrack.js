import React from 'react';

import SpotifyTrackAction from '../../Components/SpotifyTrackAction/SpotifyTrackAction';
import './SpotifyTrack.css';

class SpotifyTrack extends React.Component {

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
            <h3>{this.props.song.album}</h3>
            <p>{this.props.song.artist} | {this.props.song.title}</p>
          </div>
          <SpotifyTrackAction trackAction={this.props.action}
                              id={this.props.song.id}
                              album={this.props.song.album}
                              artist={this.props.song.artist}
                              title={this.props.song.title}
                              update={this.props.update}
                              song={this.props.song} />
      </div>
    );
  }
}

export default SpotifyTrack;
