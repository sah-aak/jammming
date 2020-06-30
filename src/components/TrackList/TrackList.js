import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';


export class TrackList extends React.Component{
    render(){
        let tracks=this.props.tracks;
        tracks=tracks.map(track=>{
            return <li key={track.id}><Track track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} /></li>;
        });
        return (
            <div className="TrackList">
                <ul>
                    {tracks}
                </ul>
            </div>
        );
    }
}