/* eslint-disable no-undef */
const expect = require('chai').expect

describe('models/sample', function () {
  before(function () {
    return require('../../../models').sequelize.sync({force: true})
  })

  beforeEach(function () {
    this.Sample = require('../../../models').Sample
  })

  it('should create a sample', function () {
    return this.Sample
      .create({
        id: 'd5ff395d-62a2-43c7-a341-69e6269361e6',
        path: 'test',
        filename: 'test.wav',
        container: 'mp4'
      })
      .then(function (sample) {
        expect(sample.id).to.equal('d5ff395d-62a2-43c7-a341-69e6269361e6')
        expect(sample.path).to.equal('test')
        expect(sample.filename).to.equal('test.wav')
        expect(sample.container).to.equal('mp4')
      })
  })
})
