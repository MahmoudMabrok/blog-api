

describe('Users', () => {
  
  describe('DB', () => {

  });


 describe('validateUser', () => {
    it('should return a user by id', async () => {
      const user = await User.findById('5f3f5f3f5f3f5f3f5f3f5f3f');
      expect(user).toHaveProperty('name', 'John Doe');
    });
  });

});
    