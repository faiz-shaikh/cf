import delay from './delay';
import Axios from 'axios';

  const cheapflights = [];


  class CheapflightApi
  {
    static getAllCheapflights()
    {
      return new Promise((resolve, reject) =>
      {
        setTimeout(() =>
        {
          Axios.get('http://59d4d1db5803340011fd5f98.mockapi.io/cheapflights/').then(response =>
            console.log(response.data))
          resolve(Object.assign([], cheapflights));
        }, delay);
      });
    }
  
    static saveCheapflight(cheapflight)
    {
      return new Promise((resolve, reject) =>
      {
        setTimeout(() =>
        {
          if (cheapflight.id)
          {
            Axios(
            {
              method: 'put',
              url: `http://59d4d1db5803340011fd5f98.mockapi.io/cheapflights/${cheapflight.id}/`,
              data: cheapflight
            })
          }
          else
          {
            Axios(
            {
              method: 'post',
              url: `http://59d4d1db5803340011fd5f98.mockapi.io/cheapflights/${cheapflight.id}/`,
              data: cheapflight
            })
          }
  
          resolve(Object.assign(
          {}, cheapflight));
        }, delay);
      });
    }
  }

export default CheapflightApi;
