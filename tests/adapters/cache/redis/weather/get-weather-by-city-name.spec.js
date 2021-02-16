const GetWeatherByCityName = require('../../../../../src/adapters/cache/redis/weather/get-weather-by-city-name')

const makeSut = () => {
  const sut = new GetWeatherByCityName({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Weather Get Weather By City Name', () => {
  it('Should throw an error if cityName param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.get()).rejects
      .toThrowError('Missing param: cityName')
  })

  it('Should generate correct key pattern', async () => {
    const { sut } = makeSut()

    sut.getKeys.get = jest.fn(() => [])
    expect(sut.generateKeyToFind('Curitiba')).toMatch(/weather\*/)
    expect(sut.generateKeyToFind('Curitiba')).toMatch(/weather\*Curitiba/)
  })

  it('If keys return an empty array should return null', async () => {
    const { sut } = makeSut()

    sut.getKeys.get = jest.fn(() => [])
    sut.getDataByKey.get = jest.fn(() => ({ cityName: 'Curitiba', weather: 'cold' }))

    console.log(sut.getKeys.get())

    await expect(sut.get('Curitiba')).resolves.toBe(null)
    expect(sut.getDataByKey.get).not.toHaveBeenCalled()
  })

  it('If keys return an filed array should get the key value in cache', async () => {
    const { sut } = makeSut()

    sut.getKeys.get = jest.fn(() => ['Key'])
    sut.generateKeyToFind = jest.fn(() => 'Key')
    sut.getDataByKey.get = jest.fn(() => ({ cityName: 'Curitiba', weather: 'cold' }))

    await expect(sut.get('Curitiba')).resolves
    expect(sut.generateKeyToFind).toHaveBeenCalled()
    expect(sut.getDataByKey.get).toHaveBeenCalled()
  })
})
