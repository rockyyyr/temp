function data(data){
  return {
    campaign_id: data.sid,
    hid: data.hid,
    transid: data.transid,
    c1: data.c1,
    c2: data.c2,
    c3: data.c3
  }
}

function sale(sale){
  return {
    total: sale.sales_today,
    previous: sale.sales_at_last_swap,
    max: sale.swap_max,
    threshold: sale.swap_threshold,
    swapped: sale.swapped_amount,
    enabled: sale.enabled
  }
}

function pixel(pixel){
  return {
    hid: pixel.hid,
    sid: pixel.campaign_id,
    transid: pixel.transid,
    c1: pixel.c1,
    c2: pixel.c2,
    c3: pixel.c3
  }
}

module.exports = {
  data,
  sale,
  pixel
}
