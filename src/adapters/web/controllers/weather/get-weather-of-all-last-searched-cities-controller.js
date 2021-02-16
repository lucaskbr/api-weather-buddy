module.exports = class GetWeatherOfAllLastSearchedCitiesController {
  constructor ({ getWeatherOfAllLastSearchedCitiesService } = {}) {
    this.getWeatherOfAllLastSearchedCitiesService = getWeatherOfAllLastSearchedCitiesService
  }

  async handle (httpReq, httpRes) {
    try {
      const { max = 5 } = httpReq.params

      const weatherOfCities = await this.getWeatherOfAllLastSearchedCitiesService.get(max)

      if (!weatherOfCities || weatherOfCities.length <= 0) {
        return httpRes.status(404).json({ message: 'Not found any weather of cities' })
      }

      return httpRes.status(200).json(weatherOfCities)
    } catch (e) {
      return httpRes.status(500)
    }
  }
}
