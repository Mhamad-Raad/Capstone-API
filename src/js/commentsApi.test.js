const { commPop } = require('./commentsApi');

test('Data should not be Null', () => {
  const arg = [{"test": "Okay"}, {"item2": "Yes"}]
  const element1 = document.querySelector('.comment-section')
  const element2 = document.querySelector('.comment__qty')
  expect(commPop(arg, element1, element2)).not.toBeNull();
})
