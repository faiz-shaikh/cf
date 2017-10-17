import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function editorValueReducer(state = initialState.editorValue, action) {
  switch (action.type) {
    case types.LOAD_EDITORVALUE_SUCCESS:
      return action.editorValue;

    default:
      return state;
  }
}
