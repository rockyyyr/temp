const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'swapper'
  },
  pool: {
    min: 0,
    max: 7
  }
})

knex.schema.hasTable('campaigns').then(exists => { if(!exists) createCampaignsTable() })
knex.schema.hasTable('organic').then(exists => { if(!exists) createOrganicTable() })
knex.schema.hasTable('sales').then(exists => { if(!exists) createSalesTable() })

function createCampaignsTable(){
  knex.schema.createTable('campaigns', table => {
    table.string('campaign_id').primary()
    table.string('product')
    table.string('affiliate')
    table.string('hitpath_url')

  }).then(console.log('campaigns table created'))
    .catch(err => console.error(err))
}

function createSalesTable(){
  knex.schema.createTable('sales', table => {
    table.string('campaign_id').primary()
    table.integer('total_clicks').defaultTo(0)
    table.integer('total_sales').defaultTo(0)
    table.integer('sales_today').defaultTo(0)
    table.integer('sales_at_last_swap').defaultTo(0)
    table.integer('swapped_amount').defaultTo(0)
    table.integer('swap_threshold').defaultTo(0)
    table.integer('swap_max').defaultTo(0)
    table.boolean('enabled').defaultTo(false)
    table.string('time_of_last_sale')

  }).then(console.log('sales table created'))
    .catch(err => console.error(err))
}

function createOrganicTable(){
  knex.schema.createTable('organic', table => {
    table.string('campaign_id')
    table.string('linked_campaign_id')
    table.string('hitpath_url')
    table.integer('swapped_sales').defaultTo(0)

  }).then(console.log('organic table created'))
    .catch(err => console.error(err))
}

module.exports = knex
