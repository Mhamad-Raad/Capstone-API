const lengthR = require('./src/js/lengthReserve.js');

describe('sends the length of the reservation per game', () => {
  test('Get length of reservations', () => {
    const key = [1];
    const length = lengthR(key);
    expect(length).toBe(1);
  });

  test('Get length of reservations', () => {
    const key = [];
    const length = lengthR(key);
    expect(length).toBe(0);
  });
});