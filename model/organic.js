const db = require('../database/db')

const TABLE = 'organic'
const KEY = 'linked_campaign_id'

function get(linkedCampaignId){
  return db.selectById(TABLE, KEY, linkedCampaignId)
}

function increment(linkedCampaignId){
 db.increment(TABLE, KEY, linkedCampaignId, 'swapped_sales')
}

module.exports = {
  get,
  increment
}
