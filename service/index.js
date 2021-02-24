import scopes from './scopes';
let SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')

const spotifyApi = new SpotifyWebApi({
  clientId: '505bd22ab9a141458e7b7286aa184061',
  clientSecret: 'aad8b58f03ef4ca1bfd7318f07bbbd64',
  redirectUri: 'http://localhost:8888/callback'
});

const app = express();

app.listen(8888, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
  )
);