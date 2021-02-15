const GetWeatherByCityName = require('../../../../src/adapters/open-weather-api/operations/get-weather-by-city-name')

const makeHttpClientSpy = () => {
  class HttpClientSpy {
    async get (route, config) {
      this.route = route
      this.config = config
      return this.result
    }
  }
  const httpClientSpy = new HttpClientSpy()
  httpClientSpy.result = {
    headers: {},
    data: {
      city: 'Curitiba',
      weather: 'cold'
    }
  }
  return httpClientSpy
}

const makeSut = () => {
  const httpClientSpy = makeHttpClientSpy()
  const sut = new GetWeatherByCityName({ httpClient: httpClientSpy })

  return {
    sut,
    httpClientSpy
  }
}

describe('Open Weather Api - Operations - Get Weather By City Name', () => {
  it('Should have correct route param in httpClient', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.get('Curitiba').resolves

    expect(httpClientSpy.route).toBe(sut.route)
  })

  it('Should return data from httpClient if request succeed', async () => {
    const { sut, httpClientSpy } = makeSut()

    const expectedResult = {
      city: 'Curitiba',
      weather: 'cold'
    }

    await expect(sut.get('Curitiba')).resolves.toEqual(expectedResult)

    expect(httpClientSpy.route).toEqual(sut.route)
  })
})
