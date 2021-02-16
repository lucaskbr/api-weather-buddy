module.exports = class GetDataByKey {
  constructor ({ redisClient } = {}) {
    this.redisClient = redisClient
  }

  async get (key) {
    if (!key) {
      throw new Error('Missing param: key')
    }

    const result = await this.redisClient.getAsync(key)

    return JSON.parse(result)
  }
}
