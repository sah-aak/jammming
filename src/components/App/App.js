import React from 'react';
import './App.css';
import {PlayList} from '../PlayList/PlayList';
import {SearchResults} from '../SearchResults/SearchResults';
import {SearchBar} from '../SearchBar/SearchBar';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      SearchResults:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1},
      {name:'Aak',artist:'papop',album:'tutakhamen',id:2},
      {name:'Aakr',artist:'paop',album:'tutikhamen',id:3}],
      playListName:"fav",
      playlistTracks:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1}]
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else{
      let newplayList=this.state.playlistTracks.push(track);
      this.setState({
        SearchResults:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1},
        {name:'Aak',artist:'papop',album:'tutakhamen',id:2},
        {name:'Aakr',artist:'paop',album:'tutikhamen',id:3}],
        playListName:"fav",
        playlistTracks:newplayList
      });
    }
  }

  removeTrack(track){
    let playlist=this.state.playlistTracks;
    var index=playlist.indexOf(track);
    playlist.splice(index,1);
    this.setState({
      SearchResults:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1},
        {name:'Aak',artist:'papop',album:'tutakhamen',id:2},
        {name:'Aakr',artist:'paop',album:'tutikhamen',id:3}],
        playlistName:"fav",
        playlistTracks:playlist
    })
  }

  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
          <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
        </div>
      </div>
    </div>
    );
  }
  
}

export default App;
