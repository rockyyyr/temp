const translate = require('../util/translate')
const log = require('../util/logger')

function analyze(sale) {
  const campaign = translate.sale(sale)
  return campaign.enabled && flaggedForSwap(campaign)
}

function flaggedForSwap(campaign) {
  return thresholdReached(campaign) && (withinLimit(campaign) || log.stat('swapping limit reached'))
}

function withinLimit({ swapped, max }) {
  return swapped < max
}

function thresholdReached({ total, previous, threshold }) {
  const difference = (total + 1) - previous
  return difference * percent(threshold) >= 1
}

function percent(num){
  return num / 100
}

module.exports = {
  analyze
}
