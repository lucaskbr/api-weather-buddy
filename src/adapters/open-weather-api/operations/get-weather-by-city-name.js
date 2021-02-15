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
    const result = await this.httpClient.get(
      this.route,
      {
        params: {
          q: cityName
        }
      })

    return result.data
  }
}
