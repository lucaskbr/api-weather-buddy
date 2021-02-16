module.exports = class GetKeys {
  constructor ({ redisClient } = {}) {
    this.redisClient = redisClient
  }

  async get (pattern) {
    if (!pattern) {
      throw new Error('Missing param: pattern')
    }

    return this.redisClient.keysAsync(pattern)
  }
}
