import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchPlaylists, fetchUser } from '../../Service';
import './Home.css';
import spotipuLogo from '../../Assets/spotipu-logo.png';

const Home = () => {
  let history = useHistory();
  const [user, setUser] = useState(undefined);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedUser = await fetchUser();
        const fetchedPlaylists = await fetchPlaylists();
        setUser(fetchedUser);
        setPlaylists(fetchedPlaylists);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  const handlePlaylist = (id) => {
    history.push({
      pathname: '/playlist',
      state: { id }
    })
  }

  const renderPlaylistCards = () => {
    return playlists.map(playlist => {
      const { id, name, image } = playlist;
      return (
        <>
          <Grid item
            justify="center"
            alignItems="center"
            xs={12} sm={6} lg={4}
          >
            <div className='playlist-card-wrapper' onClick={() => handlePlaylist(id)}>
              <div>
                <img src={image} alt={name} height={'200px'}/>
                <p>{name}</p>
              </div>
            </div>
          </Grid>
        </>
      )
    })
  }

  return (
    <div className='home-page'>
      <div style={{width: '100%'}}>
        <div style={{padding: 30}}>
          <img src={spotipuLogo} alt='logo' width={200}/>
          <h1 style={{fontSize: 54}}>{`Hello, ${!!user ? user.display_name : ''}`}</h1>
          <p>{`${!!user ? user.email : ''}`}</p>
        </div>
        <Grid container spacing={2}>
          { renderPlaylistCards() }
        </Grid>
      </div>
    </div>
  );
};

export default Home;