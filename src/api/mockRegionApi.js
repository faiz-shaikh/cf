import delay from './delay';
import Axios from 'axios';

// This file mocks a web API by working with the hard-coded data below. It uses
// setTimeout to simulate the delay of an AJAX call. All calls return promises.
const regions = [];

class RegionApi {
  static getAllRegions() {
    return new Promise((resolve, reject) => {
      Axios
        .get('http://10.44.254.6:3100/regions/available/uk')
        .then(function (response, data) {
          data = response.data.data;
          console.log(data)
          resolve(Object.assign([], data));
        })
        .catch(err => {
          console.log(err); // eslint-disable-line
        });
    });
  }

}

export default RegionApi;
