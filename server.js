const express = require('express')
const parser  = require('body-parser')
const log     = require('./util/logger')
const routes  = require('./routes')
const campaigns = require('./model/campaigns')

const port = 3000
const server = express()

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

server.use((req, res, next) => log.request(req, res, next))
server.use(parser.json())

server.use('/', routes)

server.listen(port, console.log(`\nserver listening on port ${port}\n`))

// init()

function init(){
  campaigns.save({
    campaign_id: '568',
    product: 'Puria Skin Serum',
    affiliate: 'Mobooka',
    hitpath_url: 'http://www.imclickers.com'
  })
  campaigns.save({
    campaign_id: '569',
    product: 'Puranova Eye Cream',
    affiliate: 'Mobooka',
    hitpath_url: 'http://www.imclickers.com'
  })
}

module.exports = server
