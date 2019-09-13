const URI = require('urijs');
const md5 = require('crypto-js/md5');

const prepareUrl = (path, additionalParams) => {
  const ts = new Date().getTime();
  const hash = md5(
    ts + process.env.PRIV_KEY + process.env.PUBLIC_KEY
  ).toString();
  const url = URI(path);
  url.addQuery('hash', hash);
  url.addQuery('apikey', process.env.PUBLIC_KEY);
  url.addQuery('ts', ts);
  url.addQuery(additionalParams);

  return url.toString();
};

module.exports = prepareUrl;
