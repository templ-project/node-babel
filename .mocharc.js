// .mocharc.js

module.exports = {
  recursive: true,
  reporter: 'spec',
  timeout: 5000,
  require: ['@babel/register', 'chai/register-assert.js', 'chai/register-expect.js', 'chai/register-should.js'],
};
