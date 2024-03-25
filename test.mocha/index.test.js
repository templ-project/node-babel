import {describe, it} from 'mocha';

import {hello} from '../src';

(async () => {
  const expect = await import('chai');

  describe('hello', function () {
    it('hello("World") to return "Hello World!"', function () {
      expect(hello('World')).to.equal('Hello World!');
    });
  });
})();
