import {combineReducers} from 'redux';
import cheapflights from './cheapFlightReducer';
import regions from './regionReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import editorValue from './editorValueReducer';

const rootReducer = combineReducers({
  cheapflights,
  regions,
  editorValue,
  ajaxCallsInProgress
});

export default rootReducer;
