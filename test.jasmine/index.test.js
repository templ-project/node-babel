import {hello} from '../src';

describe('hello function', function () {
  it('should return "Hello World!" when called with "World"', function () {
    expect(hello('World')).toEqual('Hello World!');
  });
});
