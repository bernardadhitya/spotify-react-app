import scopes from './scopes';
let SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')

const spotifyApi = new SpotifyWebApi({
  clientId: '505bd22ab9a141458e7b7286aa184061',
  clientSecret: 'aad8b58f03ef4ca1bfd7318f07bbbd64',
  redirectUri: 'http://localhost:8888/callback'
});

let accessToken = '';

const app = express();

const getPlaylistTracks = async (playlistId) => {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  const tracks = data.body.items.map(track_obj => {
    const track = track_obj.track;
    return track;
  })
  
  return tracks;
}

const getUserPlaylists = async (userId) => {
  const data = await spotifyApi.getUserPlaylists(userId)

  const { body: { items } } = data;

  const playlists = items.map(playlist => {
    const { id, name, images } = playlist;
    return {
      id,
      name,
      image: images[0].url
    }
  })

  return playlists;
}

const getUserData = async () => {
  const data = await spotifyApi.getMe();
  return data;
}

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});
  
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );

      accessToken = access_token;
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get('/user', async (req, res) => {
  try {
    const user = await getUserData();
    const { body: userData } = user;
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/playlists', async (req, res) => {
  try {
    const user = await getUserData();
    const { body: { id } } = user;
    const playlist = await getUserPlaylists(id);
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/playlists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await getPlaylistTracks(id);
    res.status(200).send(playlist);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(8888, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
  )
);