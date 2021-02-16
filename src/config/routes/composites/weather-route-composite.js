
const GetWeatherByCityNameController = require('../../../adapters/web/controllers/weather/get-weather-by-city-name-controller')

const GetWeatherByCityNameService = require('../../../domain/services/get-weather-by-city-name-service')

const GetWeatherByCityName = require('../../../adapters/open-weather-api/operations/get-weather-by-city-name')

const GetDataByKey = require('../../../adapters/cache/redis/get-data-by-key')

const httpClient = require('../../../adapters/open-weather-api/http-client')
const redisClient = require('../../redis-client')
const SaveDataByKey = require('../../../adapters/cache/redis/save-data-by-key')

module.exports = class WeatherRouteComposite {
  static getByCityName (req, res) {
    return new GetWeatherByCityNameController({
      getWeatherByCityNameService: new GetWeatherByCityNameService({
        getCityWeatherByNameInApi: new GetWeatherByCityName({
          httpClient: httpClient
        }),
        getCityWeatherByNameInCache: new GetDataByKey({ redisClient }),
        saveCityWeatherInCache: new SaveDataByKey({ redisClient })
      })
    })
      .handle(req, res)
  }
}
