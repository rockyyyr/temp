const express = require('express')
const sales = require('../../model/sales')
const response = require('../../util/response')

const router  = express.Router()

/**
 * Get sales data by campaign id
 */
router.get('/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.get(campaignId)

  response.respond(res, result)
})

module.exports = router
