import React, { useState, useEffect } from 'react';
import { fetchPlaylistTrack } from '../../Service';

const Playlist = (props) => {
  const { location: { state: { id } } } = props;
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

  console.log(tracks);

  return (
    <>
      <h1>Playlist</h1>
      <ul>
        {tracks.map(track => <li>{`${track.name}`}</li>)}
      </ul>
    </>
  )
}

export default Playlist;