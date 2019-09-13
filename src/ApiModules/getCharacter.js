import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const requestUrl = process.env.REACT_APP_FUNCTIONS_URL;

export default function getCharacter(params = {}) {
  const url = URI(`${requestUrl}/getCharacter`);
  Object.keys(params).forEach(key => {
    url.addQuery(key, params[key]);
  });

  return fetch(url.toString(), {
    method: 'get',
  })
    .then(res => res.json())
    .then(res => res.data);
}
