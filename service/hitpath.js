const request = require('request')
const log = require('../util/logger')

function firePixel(pixel){
  log.info(`fired pixel: ${pixel}`)
  request.get('http://www.imclickers.com/rd/ipx.php?hid=314781465&sid=570&transid=4051618&c1=adv568&c2=test&c3=link')
}

module.exports = {
  firePixel
}
