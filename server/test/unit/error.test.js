// Mini test suite for our custom error

const assert = require('assert')
const NotAudioFileError = require('../../errors/NotAudioFileError')
const util = require('util')

function doSomethingBad () {
  throw new NotAudioFileError()
}

try {
  doSomethingBad()
} catch (err) {
  // The name property should be set to the error's name
  assert(err.name === 'NotAudioFileError')

  // The error should be an instance of its class
  assert(err instanceof NotAudioFileError)

  // The error should be an instance of builtin Error
  assert(err instanceof Error)

  // The error should be recognized by Node.js' util#isError
  assert(util.isError(err))

  // The error should have recorded a stack
  assert(err.stack)

  // toString should return the default error message formatting
  assert.strictEqual(err.toString(),
    'NotAudioFileError: The given file is not a supported audio file, supported extensions are: wav, mp3.')

  // The stack should start with the default error message formatting
  assert.strictEqual(err.stack.split('\n')[0],
    'NotAudioFileError: The given file is not a supported audio file, supported extensions are: wav, mp3.')

  // The first stack frame should be the function where the error was thrown.
  assert.strictEqual(err.stack.split('\n')[1].indexOf('doSomethingBad'), 7)
}
