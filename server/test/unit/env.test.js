/* eslint-disable no-undef */
const assert = require('chai').assert

describe('env', function () {
  it('should be test environment', function () {
    assert.equal(process.env.NODE_ENV, 'test')
  })
})
