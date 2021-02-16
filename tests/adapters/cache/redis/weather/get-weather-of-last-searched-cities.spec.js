const GetWeatherOfLastSearchedCities = require('../../../../../src/adapters/cache/redis/weather/get-weather-of-last-searched-cities')

const makeSut = () => {
  const sut = new GetWeatherOfLastSearchedCities({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Weather - Get Weather Of Last Searched Cities', () => {
  it('Should throw an error if maxWeatherCities param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.get()).rejects
      .toThrowError('Missing param: maxWeatherCities')
  })

  it('Should try to get keys from redis', async () => {
    const { sut } = makeSut()

    sut.getKeys.get = jest.fn(() => [])
    await sut.get(5).resolves
    expect(sut.getKeys.get).toHaveBeenCalled()
  })

  it('Should return values from redis if keys exists', async () => {
    const { sut } = makeSut()

    const expectedResult = [{
      cityName: 'Curitiba',
      weather: {
        description: 'broken clouds',
        icon: 'http://openweathermap.org/img/w/04d.png',
        temperature: {
          celsius: 27.31
        }
      }
    }]

    sut.getKeys.get = jest.fn(() => ['key'])

    sut.getDataByKey.get = jest.fn(() =>
      expectedResult[0]
    )

    await expect(sut.get(1)).resolves.toEqual(expectedResult)
    expect(sut.getKeys.get).toHaveBeenCalled()
    expect(sut.getDataByKey.get).toHaveBeenCalled()
  })
})
