import React from 'react';

import './SpotifyTrackAction.css';

class SpotifyTrackAction extends React.Component {
  constructor(props) {
    super(props);
    this.updatePlayList = this.updatePlayList.bind(this);
  }

  updatePlayList(event) {
    this.props.update(this.props.song);
    event.preventDefault();
  }

  render() {
    return(
      <p className="Track-action" onClick={this.updatePlayList}>{this.props.trackAction}</p>
    );
  }
}

export default SpotifyTrackAction;
