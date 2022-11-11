import axios from 'axios';

export default axios.create({
  baseURL: 'https://bikecastserver-production.up.railway.app/',
});
