import '../unit_helpers';
import { minimumLength } from '../../client/utils/validations';

describe('validations', () => {
  describe('when value length is under 8 characters', () => {
    it('returns error message', () => {
      expect(minimumLength('not8')).to.equal('Must be at least 8 characters long');
    });
  });

  describe('when value length is greater than 8 characters', () => {
    it('does not return an error message', () => {
      expect(minimumLength('more-than-8')).to.equal(undefined);
    })
  });

  describe('when value length is equal to 8 characters', () =>{
    it('does not return an error message', () => {
      expect(minimumLength('exactly8')).to.equal(undefined);
    })
  })
});
