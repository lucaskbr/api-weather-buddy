const { default: axios } = require('axios')

module.exports = axios.create({
  baseURL: process.env.WEATHER_MAP_API_URL,
  params: {
    appid: process.env.WEATHER_MAP_API_KEY
  }
})
