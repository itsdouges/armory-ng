import axios from 'axios';
import config from '../../app.env';

const getMap = (id) => {
  return axios.get(`${config.gw2.endpoint}v2/maps/${id}`, {
      ignoreAuth: true,
      cache: true
    })
    .then((response) => {
      return response.data;
    });
};

export default getMap;
