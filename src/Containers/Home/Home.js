import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchPlaylists, fetchUser } from '../../Service';
import './Home.css';

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
          <div style={{margin: 10}} onClick={() => handlePlaylist(id)}>
            <img src={image} alt={name} height={'200px'}/>
            <p>{name}</p>
          </div>
        </>
      )
    })
  }

  return (
    <div className='home-page'>
      <div style={{width: '100%'}}>
        <h1>{`Hello, ${!!user ? user.display_name : ''}`}</h1>
        <p>{`${!!user ? user.email : ''}`}</p>
        <div style={{display: 'flex'}}>
          { renderPlaylistCards() }
        </div>
      </div>
    </div>
  );
};

export default Home;