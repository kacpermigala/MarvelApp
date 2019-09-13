const fetch = require('node-fetch');

const prepareUrl = require('./shared/prepareUrl');

exports.handler = async function(event, _, callback) {
  if (!event.queryStringParameters.id) {
    callback(null, {
      statusCode: 422,
      body: 'ID property is missing',
    });
  }

  const url = prepareUrl(
    `https://gateway.marvel.com/v1/public/characters/${event.queryStringParameters.id}`,
    event.queryStringParameters
  );

  const response = await fetch(url);
  const json = await response.json();

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: response.statusCode,
    body: JSON.stringify(json),
  });
};
