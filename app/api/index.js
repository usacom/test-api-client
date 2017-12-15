import BandAPI from './band'

let API_ENDPOINT;
if (process.env.API_ENDPOINT) {
  API_ENDPOINT = process.env.API_ENDPOINT
} else {
  API_ENDPOINT = 'https://clara-oswald-usa.com';
}

console.log('API_ENDPOINT', API_ENDPOINT);

const api = new BandAPI(API_ENDPOINT, localStorage);

export default api;
