import expect from 'expect';
import {regionsFormattedForDropdown} from './selectors';

describe('Region Selectors', () => {
  describe('regionsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const regions = [
        {id: 'country', firstName: 'Country'},
        {id: 'city',firstName: 'City'}
      ];

      const expected = [
        {value: 'country', text: 'Country'},
        {value: 'city', text: 'City'}
      ];

      expect(regionsFormattedForDropdown(regions)).toEqual(expected);
    });
  });
});
