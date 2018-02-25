const express = require('express')
const router  = express.Router()

router.use('/', require('./tracking'))
router.use('/sales', require('./sales'))
router.use('/settings', require('./settings'))

module.exports = router
