const express = require('express')
const response = require('../../util/response')
const campaigns = require('../../model/campaigns')
const sales   = require('../../model/sales')

const router  = express.Router()

/**
 * Get the max number of sales set for active swapping
 */
router.get('/max/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.getMax(campaignId)

  response.respond(res, result[sales.Max])
})

/**
 * Set the maximum amount of sales the swapper can make per day
 */
router.post('/max', async (req, res) => {
  const data = req.body
  const result = await sales.setMax(data)

  response.respond(res, result)
})

/**
 * Get the threshold value used to trigger active swapping as a percentage of total daily sales
 */
router.get('/threshold/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.getThreshold(campaignId)

  response.respond(res, result[sales.Threshold])
})

/**
 * Set the threshold for activating the swapper as a percentage
 */
router.post('/threshold', async (req, res) => {
  const data = req.body
  const result = await sales.setThreshold(data)

  response.respond(res, result)
})

/**
 * Get the status of active swapping for a specified campaign
 */
router.get('/enable/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.isEnabled(campaignId)

  response.respond(res, result[sales.Enabled])
})

/**
 * Enable active swapping for a specified campaign
 */
router.put('/enable/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.enable(campaignId, true)

  response.respond(res, result)
})

/**
 * Disable active swapping for a specified campaign
 */
router.put('/disable/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  const result = await sales.enable(campaignId, false)

  response.respond(res, result)
})

module.exports = router
