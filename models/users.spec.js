const users = require("./users");

describe('Users', () => {
  
  describe('DB', () => {

  });

  describe('validate', () => {
    it('should fail when name is not provided', () => {
      const result = users.validate({ email: 'test@example.com', password: 'Password123' });
      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('"name" is required'),
          })
        })
      );
    });

    it('should fail when name is not valid schedma', () => {
      const result = users.validate({ name: "a",email: 'test@example.com', password: 'Password123' });
      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('length must be at least 3 characters long'),
          })
        })
      );
    });

    it('should fail when email is not provided', () => {
      const result = users.validate({ name: 'John Doe', password: 'Password123' });
      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('"email" is required'),
          })
        })
      );
    });

    it('should fail when email is not valid', () => {
      const result = users.validate({ name: 'John Doe', email: 'testMailMail' , password: 'Password123' });
      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('must be a valid email'),
          })
        })
      );
    });

    it('should fail when password is not provided', () => {
      const result = users.validate({ name: 'John Doe', email: 'sasas@sasasa.com',});

      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('"password" is required'),
          })
        })
      );
    });


    it('should fail when password is not valid format', () => {
      const result = users.validate({ name: 'John Doe', email: 'sasas@sasasa.com', password: '123'});

      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('length must be at least 8 characters long'),
          })
        })
      );
    });

    it('should fail when password is not valid format with pattern number only', () => {
      const result = users.validate({ name: 'John Doe', email: 'sasas@sasasa.com', password: '123467897'});

      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('fails to match the required pattern'),
          })
        })
      );
    });

    it('should fail when password is not valid format with pattern character only', () => {
      const result = users.validate({ name: 'John Doe', email: 'sasas@sasasa.com', password: 'asdfghjkl'});

      expect(result).toEqual(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringContaining('fails to match the required pattern'),
          })
        })
      );
    });

    it('should pass with proper data', () => {
      const result = users.validate({ name: 'John Doe', email: 'email@example.com', password: 'a12234556678'});

      expect(result.error).toBeNull();
    });
});

});
