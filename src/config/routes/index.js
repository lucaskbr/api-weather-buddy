const { Router } = require('express')

const WeatherRouteComposite = require('./composites/weather-route-composite')

const router = Router()

router.get('/weather/:cityName', WeatherRouteComposite.getByCityName)

module.exports = router
