class AlreadyExistsError extends Error {
  constructor (type, status = 400, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyExistsError)
    }

    this.status = status
    this.message = `${type} already exists`
  }
}

module.exports = AlreadyExistsError
