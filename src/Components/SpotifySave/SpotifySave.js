import React from 'react';

import './SpotifySave.css';

class SpotifySave extends React.Component {

  saveSpotify(event, playListName) {
    event.preventDefault();
  }

  render() {
    return(
      <a className="Playlist-save" onClick={(event) => this.saveSpotify(event, this.props.playListName)}>SAVE TO SPOTIFY</a>
    );
  }
}

export default SpotifySave;
