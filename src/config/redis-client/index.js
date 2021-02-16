const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis)

module.exports = redis.createClient(process.env.REDIS_PORT, 'redis')
