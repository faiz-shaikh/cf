import {combineReducers} from 'redux';
import cheapflights from './cheapFlightReducer';
import regions from './regionReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  cheapflights,
  regions,
  ajaxCallsInProgress
});

export default rootReducer;
