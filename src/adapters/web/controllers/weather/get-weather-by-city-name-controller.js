module.exports = class GetWeatherByCityNameController {
  constructor ({ getWeatherByCityNameService } = {}) {
    this.getWeatherByCityNameService = getWeatherByCityNameService
  }

  async handle (httpReq, httpRes) {
    try {
      const { cityName } = httpReq.params

      const city = await this.getWeatherByCityNameService.get(cityName)

      if (!city) {
        return httpRes.status(400).json({ message: 'City not found' })
      }

      return httpRes.status(200).json(city)
    } catch (e) {
      return httpRes.status(500)
    }
  }
}
