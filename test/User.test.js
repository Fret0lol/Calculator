const User = require('../model/User');

test('User isValid', () => {
  const user = new User('clemfret@gmail.com', 'Fretay', 'Clément', 18);
  expect(user.isValid()).toBe(true);
});

test('User not isValid because mail', () => {
  const user = new User('huhzd.de', 'Fretay', 'Clément', 18);
  expect(user.isValid()).toBe(false);
});

test('User not isValid because age', () => {
  const user = new User('clemfret@gmail.com', 'Fretay', 'Clément', 12);
  expect(user.isValid()).toBe(false);
});

test('User not isValid because name', () => {
  const user = new User('clemfret@gmail.com', '', 'Clément', 18);
  expect(user.isValid()).toBe(false);
});

test('User not isValid because first_name', () => {
  const user = new User('clemfret@gmail.com', 'Fretay', '', 18);
  expect(user.isValid()).toBe(false);
});