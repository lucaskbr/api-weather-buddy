module.exports = class GetWeatherByCityNameService {
  constructor ({
    getCityWeatherByNameInCache,
    getCityWeatherByNameInApi,
    saveCityWeatherInCache
  } = {}) {
    this.getCityWeatherByNameInCache = getCityWeatherByNameInCache
    this.getCityWeatherByNameInApi = getCityWeatherByNameInApi
    this.saveCityWeatherInCache = saveCityWeatherInCache
  }

  async get (cityName) {
    if (!cityName) {
      throw new Error('Missing param: cityName')
    }

    const cachedCityWeather = await this.getCityWeatherByNameInCache.get(cityName)

    if (cachedCityWeather) {
      return cachedCityWeather
    }

    const cityWeather = await this.getCityWeatherByNameInApi.get(cityName)

    this.saveCityWeatherInCache.save(cityName, cityWeather)

    return cityWeather
  }
}
