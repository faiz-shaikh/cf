import delay from './delay';
import {HTTP} from './configureApi'; // eslint-disable-line

const cheapflights = [];

class CheapflightApi
{
  static getAllCheapflights()
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        HTTP(`cheapflights`).catch(err => {
          throw err;
        });
        resolve(Object.assign([], cheapflights));
      }, delay);
    });
  }

  static saveCheapflight(cheapflight)
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cheapflight.id) {
          HTTP({method: 'put', url: `cheapflight/${cheapflight.id}/`, data: cheapflight}).catch(err => {
            throw err;
          });
        } else {
          HTTP({method: 'post', url: `xyz`, data: cheapflight}).catch(err => {
            throw err;
          });
        }
        resolve(Object.assign({}, cheapflight));
      }, delay);
    });
  }
}

export default CheapflightApi;
