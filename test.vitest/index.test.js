import {expect, test} from 'vitest';

import {hello} from '../src';

// eslint-disable-next-line mocha/no-global-tests
test('hello("World") to return "Hello World!"', function () {
  expect(hello('World')).toEqual('Hello World!');
});
