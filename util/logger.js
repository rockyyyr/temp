const color = require('chalk')

function info(message){
  console.log(`${time()}  [${green('info')}] - ${message}`)
}

function error(message){
  console.log(`${time()} [${red('error')}] - ${message}`)
}

function swap(a, b){
  console.log(`${time()}  [${red('swap')}] - SWAPPING [${a}] with [${b}]`)
}

function stat(message){
  console.log(`${time()} [${yellow('stats')}] - ${message}`)
}

function request(req, res, next){
  info(`${green('REQUEST')} - [${req.method}]: ${req.url}`)
  next()
}

function response(res){
  info(`${green('RESPONSE')} - [${res.statusCode}]: OK`)
}

function time(){
  return yellow(timeStampFormatter(new Date()))
}

function timeStampFormatter(date){
  return  '' +
    `${_pad(date.getHours(), 2)}:` +
    `${_pad(date.getMinutes(), 2)}:` +
    `${_pad(date.getSeconds(), 2)}:` +
    `${_pad(date.getMilliseconds(), 3)}`
}

function _pad(num, size){
  const digits = num.toString().length
  return digits < size ? '000'.substr(digits - size) + num : num
}

function green(x){ return color.green(x) }
function yellow(x){ return color.yellow(x) }
function red(x){ return color.red(x) }
function blue(x){ return color.blue(x)}

module.exports = {
  info,
  error,
  swap,
  stat,
  request,
  response
}
