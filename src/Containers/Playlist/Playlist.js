import React, { useState, useEffect } from 'react';
import { fetchPlaylistTrack } from '../../Service';
import { Grid } from '@material-ui/core';
import './Playlist.css';
import spotipuLogo from '../../Assets/spotipu-logo.png';

const Playlist = (props) => {
  const { location: { state: { playlist } } } = props;
  const { id, name, image, ownerName } = playlist;
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedPlaylistTrack = await fetchPlaylistTrack(id);
        setTracks(fetchedPlaylistTrack);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const renderTrackList = () => {
    return tracks.map(track => {
      const { name, album: { images }, artists } = track;
      return (
        <Grid item
          xs={12} sm={6} lg={4}
        >
          <div className='track-card-wrapper'>
            <img src={images[0].url} alt={name} height={100}/>
            <div style={{width: '30px'}}></div>
            <div>
              <p style={{marginBottom: 0}}>{name}</p>
              <p style={{marginTop: 0, color: '#1db954'}}>{artists[0].name}</p>
            </div>
          </div>
        </Grid>
      )
    })
  }

  const handleLogin = async () => {
    var win = window.open('http://localhost:8888/login', '_self');
    win.focus();
  }

  return playlist ? (
    <div className='home-page'>
      <div style={{width: '100%'}}>
        <div style={{padding: 30}}>
          <img src={spotipuLogo} alt='logo' width={200}/>
          <div style={{height: 30}}></div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <img src={image} alt='logo' width={200}/>
            </Grid>
            <Grid item xs={12} md={10}>
              <h1 style={{
                fontSize: 54,
                marginBottom: 0
              }}>
                {name}
              </h1>
              <p style={{marginTop: 8}}>{ownerName}</p>
            </Grid>
          </Grid>
          <h2 style={{color: '#1db954', marginTop: 24}}>Songs in this Playlist</h2>
        </div>
        <div style={{paddingRight: 30, paddingLeft: 30}}>
          <Grid container spacing={2}>
            {renderTrackList()}
          </Grid>
        </div>
      </div>
    </div>
  ) : (
    <div className='no-data-page'>
      <div>
        <img src={spotipuLogo} alt='logo' width='200px'/>
        <h1>You have not logged in</h1>
        <p>Please try logging in</p>
        <div className='login-btn' onClick={() => handleLogin()}>
          <h3>Login</h3>
        </div>
      </div>
    </div>
  )
}

export default Playlist;