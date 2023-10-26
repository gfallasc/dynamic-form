import { isValidEmail, isValidPhone, validateField } from './validation';

describe('Input utils functions', () => {

  describe('isValidEmail', () => {
    it('should validate a correct email', () => {
      expect(isValidEmail('me@example.com')).toBeTruthy();
    });

    it('should invalidate a wrong email', () => {
      expect(isValidEmail('wrong@')).toBeFalsy();
    });
  });

  describe('isValidPhone', () => {
    it('should validate a correct phone number', () => {
      expect(isValidPhone('+1 (213) 373 4253')).toBeTruthy();
    });

    it('should invalidate a wrong phone number', () => {
      expect(isValidPhone('123456')).toBeFalsy();
    });
  });

  describe('validateField', () => {
    it('should return required error for empty required field', () => {
      expect(validateField('firstName', 'First name', '', true)).toBe('First name is required');
    });

    it('should return null for non-empty required field', () => {
      expect(validateField('firstName', 'Name', 'First name', true)).toBeNull();
    });

    it('should validate email fields', () => {
      expect(validateField('email', 'Email', 'wrong@')).toBe('Please enter a valid email address');
    });

    it('should validate phone fields', () => {
      expect(validateField('phone', 'Phone', '123456')).toBe('Please enter a valid phone, e.g +1 (123) 456-7890');
    });
  });
});
