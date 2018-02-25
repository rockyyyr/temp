const campaigns = require('../model/campaigns')

function create(data) {
  return new Promise(async resolve => {
    // const campaign = await campaigns.get(data.campaign_id)
    resolve(`http://www.imclickers.com/rd/ipx.php?hid=${data.hid}&sid=${data.campaign_id}&transid=${data.transid}&c1=${data.c1}&c2=${data.c2}&c3=${data.c3}`)
  })
}

module.exports = {
  create
}
