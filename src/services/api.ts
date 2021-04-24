import axios from 'axios';

export default axios.create({
  baseURL: 'https://bike-cast-server.herokuapp.com/',
});
