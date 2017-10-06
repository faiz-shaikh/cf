import {combineReducers} from 'redux';
import cheapflights from './cheapFlightReducer';
import authors from './authorReducer';
import regions from './regionReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  cheapflights,
  authors,
  regions,
  ajaxCallsInProgress
});

export default rootReducer;
