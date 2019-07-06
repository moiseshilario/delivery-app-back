class AlreadyExistsError extends Error {
  constructor (type, status = 400, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)
    this.name = 'AlreadyExistsError'
    this.status = status
    this.message = `${type} already exists`
  }
}

module.exports = AlreadyExistsError
