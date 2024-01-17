#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Please provide a Movie ID as a command-line argument.');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, { json: true }, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error('Error fetching movie data:', error || `Status Code: ${response.statusCode}`);
    process.exit(1);
  }

  const characters = body.characters;

  if (!characters || characters.length === 0) {
    console.log('No characters found for this movie.');
    process.exit(0);
  }

  console.log(`Characters in ${body.title}:`);

  characters.forEach((characterUrl) => {
    request(characterUrl, { json: true }, (charError, charResponse, charBody) => {
      if (charError || charResponse.statusCode !== 200) {
        console.error('Error fetching character data:', charError || `Status Code: ${charResponse.statusCode}`);
        process.exit(1);
      }

      console.log(charBody.name);
    });
  });
});
