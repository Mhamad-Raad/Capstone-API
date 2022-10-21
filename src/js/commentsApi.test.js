jest.mock('./commentsApi.js');

const { postComments, getcomments } = require('./commentsApi.js');

const comments = [{ comment: 'Love it', username: 'Munoz' }, { comment: 'hate it', username: 'Pedro' }];
test('Must Return length of Comments', () => {
  expect(getcomments(comments)).toBe(2);
});
const arr = [];
test('Must add comment to Array', () => {
  expect(postComments({ comment: 'Amazing', username: 'Lucas' }, arr)).toBe(1);
});
