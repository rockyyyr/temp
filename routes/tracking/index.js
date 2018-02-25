const translate = require('../../util/translate')
const response = require('../../util/response')
const tracker = require('../../service/tracker')
const hitpath = require('../../service/hitpath')
const swapper = require('../../service/swapper')
const pixels  = require('../../service/pixels')
const express = require('express')

const router  = express.Router()

const SALE = '/rd/ipx.php'

/**
 * Report a sale
 */
router.get(SALE, async (req, res) => {
  const data = translate.data(req.query)
  const result = await tracker.trackSale(data)

  response.respond(res, translate.pixel(result))

  const pixel  = await pixels.create(result)

  hitpath.firePixel(pixel)
})

module.exports = router
