
const GetWeatherByCityNameController = require('../../../adapters/web/controllers/weather/get-weather-by-city-name-controller')

const GetWeatherByCityNameService = require('../../../domain/services/get-weather-by-city-name-service')

const GetWeatherByCityNameApi = require('../../../adapters/open-weather-api/operations/get-weather-by-city-name')

const SaveWeatherByCityName = require('../../../adapters/cache/redis/weather/save-weather-by-city-name')
const GetWeatherByCityNameRedis = require('../../../adapters/cache/redis/weather/get-weather-by-city-name')

const httpClient = require('../../../adapters/open-weather-api/http-client')
const redisClient = require('../../redis-client')

module.exports = class WeatherRouteComposite {
  static getByCityName (req, res) {
    return new GetWeatherByCityNameController({
      getWeatherByCityNameService: new GetWeatherByCityNameService({
        getCityWeatherByNameInApi: new GetWeatherByCityNameApi({
          httpClient: httpClient
        }),
        getCityWeatherByNameInCache: new GetWeatherByCityNameRedis({ redisClient }),
        saveCityWeatherInCache: new SaveWeatherByCityName({ redisClient })
      })
    })
      .handle(req, res)
  }
}
