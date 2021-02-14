const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  return res.json({ ok: 'ok' })
})

module.exports = router
