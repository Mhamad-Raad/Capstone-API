let addLikes = require('./src/js/addLikes.js');

describe('add like to the like button', () => {
  test('add like to an object', () => {
    let key = {
      likes: 0,
    }
    key = addLikes(key);
    expect(key.likes).toBe(1);
  });

  test('add like to an object with big numbers', () => {
    let key = {
      likes: 10000,
    }
    key = addLikes(key);
    expect(key.likes).toBe(10001);
  });
});