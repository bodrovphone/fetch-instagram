const requestp = require('request-promise');

async function Test() {
async function getPostByUrl() {
  const mediaUrl = `https://www.instagram.com/p/B4lphTtgpgk/?__a=1`;

  try {
    const mediaBody = await requestp.get({
      uri: mediaUrl,
      json: true,
      pool: { maxSockets: Infinity },
      resolveWithFullResponse: true,
      simple: false
    });
    console.log(mediaBody)

    if (!mediaBody) {
      throw new Error(`Bad instagram return for url ${mediaUrl}: ${JSON.stringify(mediaBody ? mediaBody.meta : null)}`);
    }
    return mediaBody;
  } catch (err) {
    logger.error('Error making request to Instagram for media body', { err: err, tags: [ client, mediaUrl ] });
  }
}

try {
const mediaBody = await getPostByUrl();

console.log('mediaBody TEST: ', mediaBody);

if (mediaBody && mediaBody.statusCode === 200 && mediaBody.body && mediaBody.body.graphql && mediaBody.body.graphql.shortcode_media) {
  console.log('All is fine')
} else if (mediaBody && mediaBody.body && (mediaBody.statusCode === 404 || !mediaBody.body.graphql)) {
  console.log('something went wrong')
} else if (mediaBody && mediaBody.statusCode && mediaBody.statusCode !== 200) {
  console.log('Not that time')
} else {
  console.error(`Error getting empty mediaBody for Instagram Mentions or User Tag for`)
}
} catch (err) {
  console.error(`Error getting empty mediaBody for Instagram Mentions or User Tag for`)
} 

}

exports.handler = async (event) => {
  const response = await Test();
  console.log('Myresponse', response)
  return response;
};
