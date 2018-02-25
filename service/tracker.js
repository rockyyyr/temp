const analyzer = require('./analyzer')
const swapper = require('./swapper')
const sales = require('../model/sales')
const organics = require('../model/organic')

async function trackSale(data) {
  const sale = await sales.get(data.campaign_id)
  const swap = analyzer.analyze(sale)

  const final = swap ? await swapper.swap(data) : data

  incrementSale(sale, swap)

  return final
}

function trackClick(data) {

}

function incrementSale(sale, swap) {
  if (swap) {
    sales.updateAmountAtLastSwap(sale)
    organics.increment(sale.campaign_id)
  } else {
    sales.increment(sale.campaign_id)
  }
}

module.exports = {
  trackSale,
  trackClick,
}
