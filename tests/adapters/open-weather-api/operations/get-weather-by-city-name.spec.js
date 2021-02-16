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

  it('Should return null if request status code are 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    const expectedResult = null

    // eslint-disable-next-line
    httpClientSpy.result = Promise.reject({
      response: {
        status: 404
      }
    })

    await expect(sut.get('Curitiba')).resolves.toBe(expectedResult)
  })

  it('Should throw an error if request status code arent 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    // eslint-disable-next-line
    httpClientSpy.result = Promise.reject({
      response: {
        status: 400
      }
    })

    await expect(sut.get('Curitiba')).rejects.toThrow()
  })
})
