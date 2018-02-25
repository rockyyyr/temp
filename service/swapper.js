const campaigns = require('../model/campaigns')
const organics = require('../model/organic')
const log = require('../util/logger')

async function swap(data) {
  const organic = await organics.get(data.campaign_id)
  return swapCampaigns(data, organic)
}

function swapCampaigns(data, organic){
  log.swap(data.campaign_id, organic.campaign_id)
  data.campaign_id = organic.campaign_id
  return data
}

module.exports = {
  swap
}
