module.exports = class GetWeatherOfAllLastSearchedCitiesService {
  constructor ({ getLastSearchedCities } = {}) {
    this.getLastSearchedCities = getLastSearchedCities
  }

  async get (maxCities) {
    return this.getLastSearchedCities.get(maxCities)
  }
}
