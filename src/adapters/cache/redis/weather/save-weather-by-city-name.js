const SaveDataByKey = require('../save-data-by-key')

module.exports = class SaveWeatherByCityName {
  constructor ({ redisClient } = {}) {
    this.saveDataByKey = new SaveDataByKey({ redisClient })
  }

  generateKeyToSave (cityName) {
    return `weather:${Date.now()}:${cityName}`
  }

  async save (cityName, data) {
    if (!cityName) {
      throw new Error('Missing param: cityName')
    }

    if (!data) {
      throw new Error('Missing param: data')
    }

    return this.saveDataByKey.save(this.generateKeyToSave(cityName), data)
  }
}
