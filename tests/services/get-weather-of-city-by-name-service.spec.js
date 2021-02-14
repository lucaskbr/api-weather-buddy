const { resolve } = require('path')
const GetWeatherOfCityByNameService = require(resolve('./src/domain/services/get-weather-of-city-by-name-service.js'))

const makeGetCityWeatherByNameInCache = () => {
  class GetCityWeatherByNameInCacheSpy {
    async get (name) {
      this.cityName = name
      return this.result
    }
  }
  const getCityWeatherByNameInCacheSpy = new GetCityWeatherByNameInCacheSpy()
  getCityWeatherByNameInCacheSpy.result = {
    from: 'Cache',
    city: 'Curitiba',
    weather: 'cold'
  }
  return getCityWeatherByNameInCacheSpy
}

const makeGetCityWeatherByNameInApi = () => {
  class GetCityWeatherByNameInApiSpy {
    async get (name) {
      this.cityName = name
      return this.result
    }
  }
  const getCityWeatherByNameInApiSpy = new GetCityWeatherByNameInApiSpy()
  getCityWeatherByNameInApiSpy.result = {
    from: 'API',
    city: 'Curitiba',
    weather: 'cold'
  }
  return getCityWeatherByNameInApiSpy
}

const makeSaveCityWeatherInCache = () => {
  class SaveCityWeatherInCacheSpy {
    async save (cityWeather) {
      this.cityWeather = cityWeather
      this.result = cityWeather
      return this.result
    }
  }
  const saveCityWeatherInCacheSpy = new SaveCityWeatherInCacheSpy()
  return saveCityWeatherInCacheSpy
}

const makeSut = () => {
  const getCityWeatherByNameInCacheSpy = makeGetCityWeatherByNameInCache()
  const getCityWeatherByNameInApiSpy = makeGetCityWeatherByNameInApi()
  const saveCityWeatherInCacheSpy = makeSaveCityWeatherInCache()

  const sut = new GetWeatherOfCityByNameService({
    getCityWeatherByNameInCache: getCityWeatherByNameInCacheSpy,
    getCityWeatherByNameInApi: getCityWeatherByNameInApiSpy,
    saveCityWeatherInCache: saveCityWeatherInCacheSpy
  })

  return {
    sut,
    getCityWeatherByNameInCacheSpy,
    getCityWeatherByNameInApiSpy,
    saveCityWeatherInCacheSpy
  }
}

describe('Service - Get Weather Of City By Name', () => {
  it('Should throw an exception if cityName its not provided', async () => {
    const sut = new GetWeatherOfCityByNameService({})
    await expect(sut.get()).rejects
      .toThrowError()
  })

  it('Should return cached weather city if exists', async () => {
    const { sut } = makeSut()

    await expect(sut.get('Curitiba'))
      .resolves
      .toEqual({
        from: 'Cache',
        city: 'Curitiba',
        weather: 'cold'
      })
  })

  it('Shouldnt return cached weather city if not exists', async () => {
    const { sut, getCityWeatherByNameInCacheSpy } = makeSut()
    getCityWeatherByNameInCacheSpy.result = undefined

    await expect(sut.get('Curitiba'))
      .resolves.not.toBe(undefined)
  })

  it('Should return weather city from api if cache doesnt exists', async () => {
    const { sut, getCityWeatherByNameInCacheSpy } = makeSut()

    getCityWeatherByNameInCacheSpy.result = undefined

    await expect(sut.get('Curitiba'))
      .resolves
      .toEqual({
        from: 'API',
        city: 'Curitiba',
        weather: 'cold'
      })
  })

  it('Should save weather city from api in cache', async () => {
    const { sut, getCityWeatherByNameInCacheSpy, saveCityWeatherInCacheSpy } = makeSut()

    getCityWeatherByNameInCacheSpy.result = undefined

    await sut.get('São Paulo')

    expect(saveCityWeatherInCacheSpy.result).toEqual({
      from: 'API',
      city: 'Curitiba',
      weather: 'cold'
    })
  })
})
