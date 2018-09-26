import React from 'react';
import {searchSpotify} from '../../util/Helper';
import './SpotifySearchForm.css';

class SpotifySearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const searchTerm = this.state.value;
    let musicReturned = null;

    var searchMusicPromise = new Promise(function(resolve, reject) {
      musicReturned = searchSpotify(searchTerm);
      let goodResult = true;
      if (goodResult) {
        resolve("Music downloaded");
      }
      else {
        reject(Error("Error!"));
      }
    });

    searchMusicPromise.then(function(result) {
      console.log(musicReturned);
      //this.props.update(musicReturned);
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="Enter A Song Title" value={this.state.value}
                                                              onChange={this.handleChange} />
        </label>
        <input type="submit" value="SEARCH" />
      </form>
    );
  }
}

export default SpotifySearchForm;
