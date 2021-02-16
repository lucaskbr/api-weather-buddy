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
          q: cityName
        }
      })
      .then(result => result.data)
      .catch(e => {
        if (e.response.status === 404) {
          return null
        }

        throw new Error(`Open Weather Api: statusCode: ${e.response.status} message: ${e.response.statusText}`)
      })
  }
}
