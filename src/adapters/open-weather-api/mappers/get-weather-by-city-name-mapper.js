const getWeatherByCityNameMapper = (data) => ({
  cityName: data.name,
  weather: {
    description: data.weather[0].description,
    icon: `${process.env.WEATHER_MAP_IMGS_URL}/${data.weather[0].icon}.png`,
    temperature: {
      celsius: data.main.temp
    }
  }
})

module.exports = getWeatherByCityNameMapper
