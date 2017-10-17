import * as types from './actionTypes';

export function loadEditorValuesSuccess(editorValues) {
  console.log('loaded', editorValues);
  return {type: types.LOAD_EDITORVALUE_SUCCESS, editorValues};
}
