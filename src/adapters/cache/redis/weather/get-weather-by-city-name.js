const GetDataByKey = require('../get-data-by-key')
const GetKeys = require('../get-keys')

module.exports = class GetWeatherByCityName {
  constructor ({ redisClient } = {}) {
    this.getKeys = new GetKeys({ redisClient })
    this.getDataByKey = new GetDataByKey({ redisClient })
  }

  generateKeyToFind (cityName) {
    return `weather*${cityName}`
  }

  async get (cityName) {
    if (!cityName) {
      throw new Error('Missing param: cityName')
    }

    const keys = await this.getKeys.get(this.generateKeyToFind(cityName))

    if (!keys || keys.length <= 0) {
      return null
    }

    return this.getDataByKey.get(keys[0])
  }
}
