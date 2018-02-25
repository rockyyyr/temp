const db = require('../database/db')

const table = 'campaigns'
const key   = 'campaign_id'

async function save(campaign){
  await db.insert(table, campaign)
  db.insert('sales',{campaign_id: campaign.campaign_id})
}

function get(campaignId, columns){
  return db.selectById(table, key, campaignId, columns)
}

module.exports = {
  save,
  get
}
