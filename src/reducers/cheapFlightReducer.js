import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function cheapFlightReducer(state = initialState.cheapflights, action) {
  switch (action.type) {
    case types.LOAD_CHEAPFLIGHTS_SUCCESS:
      return action.cheapflights;

    case types.CREATE_CHEAPFLIGHT_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.cheapflight)
    ];

    case types.UPDATE_CHEAPFLIGHT_SUCCESS:
      return [
        ...state.filter(cheapflight => cheapflight.id !== action.cheapflight.id),
        Object.assign({}, action.cheapflight)
      ];

    default:
      return state;
  }
}
