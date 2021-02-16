const getWeatherByCityNameMapper = require('../mappers/get-weather-by-city-name-mapper')

module.exports = class GetWeatherByCityName {
  constructor ({ httpClient } = {}) {
    this.httpClient = httpClient
    this.route = 'weather'
  }

  /**
   *
   *  Doc: https://openweathermap.org/current#name
   *
   */
  async get (cityName) {
    return this.httpClient.get(
      this.route,
      {
        params: {
          q: cityName,
          units: 'metric'
        }
      })
      .then(result => getWeatherByCityNameMapper(result.data))
      .catch(e => {
        if (e.response.status === 404) {
          return null
        }

        throw new Error(`Open Weather Api: statusCode: ${e.response.status} message: ${e.response.statusText}`)
      })
  }
}
