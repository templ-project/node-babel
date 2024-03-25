import test from 'ava';

import {hello} from '../src';

// eslint-disable-next-line mocha/handle-done-callback, mocha/no-global-tests
test('greet returns a proper greeting message', (t) => {
  const name = 'World';
  const expected = 'Hello World!';
  const actual = hello(name);

  t.is(actual, expected, `greet('${name}') should return '${expected}'`);
});
