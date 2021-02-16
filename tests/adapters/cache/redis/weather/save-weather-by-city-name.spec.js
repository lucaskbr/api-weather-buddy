const SaveWeatherByCityName = require('../../../../../src/adapters/cache/redis/weather/save-weather-by-city-name')

const makeSut = () => {
  const sut = new SaveWeatherByCityName({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Weather Save Weather By City Name', () => {
  it('Should throw an error if cityName param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.save()).rejects
      .toThrowError('Missing param: cityName')
  })

  it('Should throw an error if data param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.save('Curitiba')).rejects
      .toThrowError('Missing param: data')
  })

  it('Should generate correct key pattern', async () => {
    const { sut } = makeSut()
    expect(sut.generateKeyToSave('Curitiba')).toMatch(/weather:[0-9]*/)
    expect(sut.generateKeyToSave('Curitiba')).toMatch(/Curitiba/)
  })
})
