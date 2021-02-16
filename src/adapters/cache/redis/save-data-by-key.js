module.exports = class SaveDataByKey {
  constructor ({ redisClient } = {}) {
    this.redisClient = redisClient
    this.timeout = 300
  }

  async save (key, data) {
    if (!key) {
      throw new Error('Missing param: key')
    }

    if (!data) {
      throw new Error('Missing param: data')
    }

    return this.redisClient.setex(key, this.timeout, JSON.stringify(data))
  }
}
