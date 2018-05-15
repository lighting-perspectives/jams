/* eslint-disable no-undef */
const expect = require('chai').expect

describe('env', function () {
  it('should be test environment', function () {
    expect(process.env.NODE_ENV).to.equal('test')
  })
})
