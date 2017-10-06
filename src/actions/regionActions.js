import RegionApi from '../api/mockRegionApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadRegionsSuccess(regions) {
  console.log('loaded', regions);
  return {type: types.LOAD_REGIONS_SUCCESS, regions};
}

export function loadRegions() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return RegionApi.getAllRegions().then(regions => {
      dispatch(loadRegionsSuccess(regions));
    }).catch(error => {
      throw(error);
    });
  };
}
