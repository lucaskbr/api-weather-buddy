const GetWeatherOfAllLastSearchedCitiesService = require('../../src/domain/services/get-weather-of-all-last-searched-cities-service')

const makeGetLastSearchedCitiesSpy = () => {
  class GetLastSearchedCitiesSpy {
    async get (maxCities) {
      return this.result
    }
  }

  return new GetLastSearchedCitiesSpy()
}

const makeSut = () => {
  const getLastSearchedCitiesSpy = makeGetLastSearchedCitiesSpy()

  const sut = new GetWeatherOfAllLastSearchedCitiesService({
    getLastSearchedCities: getLastSearchedCitiesSpy
  })

  return { sut, getLastSearchedCitiesSpy }
}

describe('Service - Get Weather Of All Last Searched Cities Service', () => {
  it('Should call the method to get last searched cities', () => {
    const { sut, getLastSearchedCitiesSpy } = makeSut()

    getLastSearchedCitiesSpy.get = jest.fn(() =>
      true
    )

    sut.get()

    expect(getLastSearchedCitiesSpy.get).toHaveBeenCalled()
  })
})
