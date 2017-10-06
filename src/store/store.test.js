import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as cheapFlightsActions from '../actions/cheapFlightsActions';

describe('Store', function() {
  it('Should handle creating cheapflights', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const cheapflight = {
      title: "Clean Code"
    };

    // act
    const action = cheapFlightsActions.createCheapflightSuccess(cheapflight);
    store.dispatch(action);

    // assert
    const actual = store.getState().cheapflights[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  });
});
