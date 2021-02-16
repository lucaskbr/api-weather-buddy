const GetDataByKey = require('../get-data-by-key')
const GetKeys = require('../get-keys')

module.exports = class GetWeatherOfLastSearchedCities {
  constructor ({ redisClient }) {
    this.getKeys = new GetKeys({ redisClient })
    this.getDataByKey = new GetDataByKey({ redisClient })
    this.key = 'weather:*'
  }

  async get (maxWeatherCities) {
    if (!maxWeatherCities) {
      throw new Error('Missing param: maxWeatherCities')
    }

    const keys = await this.getKeys.get(this.key)

    const lastKeysSearched = keys.sort().reverse().splice(0, maxWeatherCities)

    const values = await Promise.all((lastKeysSearched.map(key => (
      this.getDataByKey.get(key)
    ))))

    return values
  }
}
