import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe('Author Selectors', () => {
  describe('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      const authors = [
        {id: 'country', firstName: 'Country'},
        {id: 'city',firstName: 'City'}
      ];

      const expected = [
        {value: 'country', text: 'Country'},
        {value: 'city', text: 'City'}
      ];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
