const log = require('./logger')

function respond(response, result) {
  log.response(response)
  response.json(result)
}

function error(message) {
  return {
    error: message
  }
}

module.exports = {
  respond,
  error
}
