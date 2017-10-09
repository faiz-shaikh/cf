import expect from 'expect';
import {regionsFormattedForDropdown} from './selectors';

describe('Region Selectors', () => {
  describe('regionsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const regions = [ 'country', 'city'];

      const expected = [
        {value: 'country', text: 'country'},
        {value: 'city', text: 'city'}
      ];

      expect(regionsFormattedForDropdown(regions)).toEqual(expected);
    });
  });
});
