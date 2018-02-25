const db = require('../database/db')

const TABLE = 'sales'
const KEY = 'campaign_id'
const MAX = 'swap_max'
const THRESHOLD = 'swap_threshold'
const ENABLED = 'enabled'

/**
 * Get a sales data queried by campaign id
 *
 * @param campaignId the specified campaign
 * @param columns    (optional) the columns to be returned
 */
function get (campaignId, columns) {
  return db.selectById(TABLE, KEY, campaignId, columns)
}

/**
 * Get the daily maximum of sales a swapper can make before it gets disabled
 *
 * @param campaignId the specified campaign
 */
function getMax(campaignId) {
  return get(campaignId, [MAX])
}

/**
 * Set a daily maximum of sales the swapper can make before it gets disabled
 *
 * @param max a maximum amount of daily sales for the swapper
 * @param campaignId the specified campaign
 */
function setMax({max, campaignId}) {
  return db.updateById(TABLE, KEY, campaignId, {swap_max: max})
}

/**
 * Get the threshold value for triggering an active swap as a percentage of total daily sales
 *
 * @param campaignId the specified campaign
 */
function getThreshold(campaignId) {
  return get(campaignId, [THRESHOLD])
}

/**
 * Set the threshold for activating the swapper for a specified campaign as
 * a percentage of sales for the current day
 *
 * @param threshold  a percentage
 * @param campaignId the specified campaign
 */
function setThreshold({threshold, campaignId}) {
  return db.updateById(TABLE, KEY, campaignId, {swap_threshold: threshold})
}

/**
 * Reset the daily total of sales for a specified campaign
 *
 * @param campaignId the specified campaign
 */
function resetDailyTotal(campaignId) {
  db.updateById(TABLE, KEY, campaignId, {sales_today: 0})
}

/**
 * Updates the campaign associated with the specified sale, setting the total number of sales
 * for the day that were registered when the last swap occurred
 *
 * @param sale the specified sale to update
 */
function updateAmountAtLastSwap(sale){
  db.updateById(TABLE, KEY, sale.campaign_id, {sales_at_last_swap: sale.sales_today})
  db.increment(TABLE, KEY, sale.campaign_id, 'swapped_amount')
}

/**
 * Increment total sales, sales today and update the latest sale timestamp
 * for a specified campaign
 *
 * @param campaignId the specified campaign
 */
function increment(campaignId) {
  db.increment(TABLE, KEY, campaignId, 'total_sales')
  db.increment(TABLE, KEY, campaignId, 'sales_today')
  db.updateById(TABLE, KEY, campaignId, {time_of_last_sale: new Date().toISOString()})
}

/**
 * Toggle active swapping for the specified campaign
 *
 * @param campaignId the specified campaign to toggle
 * @param enabled    true to enable active swapping, false otherwise
 */
function enable(campaignId, enabled) {
  return db.updateById(TABLE, KEY, campaignId, {enabled: enabled})
}

/**
 * Return the active swapping enabled status for a specified campaign
 *
 * @param campaignId the specified campaign
 */
function isEnabled(campaignId) {
  return get(campaignId, [ENABLED])
}

module.exports = {
  Max: MAX,
  Threshold: THRESHOLD,
  Enabled: ENABLED,
  get,
  setMax,
  getMax,
  setThreshold,
  getThreshold,
  resetDailyTotal,
  updateAmountAtLastSwap,
  increment,
  enable,
  isEnabled
}