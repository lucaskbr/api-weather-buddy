module.exports = class GetWeatherByCityNameController {
  constructor ({ getWeatherByCityNameService } = {}) {
    this.getWeatherByCityNameService = getWeatherByCityNameService
  }

  async handle (httpReq, httpRes) {
    try {
      const { cityName } = httpReq.params

      const cityWeather = await this.getWeatherByCityNameService.get(cityName)

      if (!cityWeather) {
        return httpRes.status(400).json({ message: 'City not found' })
      }

      return httpRes.status(200).json(cityWeather)
    } catch (e) {
      return httpRes.status(500)
    }
  }
}
