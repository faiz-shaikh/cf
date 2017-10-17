import CheapflightApi from '../api/mockCheapFlightsApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import Axios from 'axios';

export function loadCheapflightsSuccess(cheapflights) {
  console.log('loaded', cheapflights);
  return {type: types.LOAD_CHEAPFLIGHTS_SUCCESS, cheapflights};
}

export function createCheapflightSuccess(cheapflight) {
  console.log('create new', cheapflight);
  return {type: types.CREATE_CHEAPFLIGHT_SUCCESS, cheapflight};
}

export function updateCheapflightSuccess(cheapflight) {
  console.log('update existing', cheapflight);
  return {type: types.UPDATE_CHEAPFLIGHT_SUCCESS, cheapflight};
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadCheapflights() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    Axios.get('http://59d4d1db5803340011fd5f98.mockapi.io/cheapflights/').then(cheapflights => {
      console.log(cheapflights);
      dispatch(loadCheapflightsSuccess(cheapflights.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCheapflight(cheapflight) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return CheapflightApi.saveCheapflight(cheapflight).then(cheapflight => {
      console.log(cheapflight.id);
      cheapflight.id ? dispatch(updateCheapflightSuccess(cheapflight)) : dispatch(createCheapflightSuccess(cheapflight));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

