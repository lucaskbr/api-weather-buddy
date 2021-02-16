const GetDataByKey = require('../../../../src/adapters/cache/redis/get-data-by-key')

const makeSut = () => {
  const sut = new GetDataByKey({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Save Data By Key', () => {
  it('Should throw an error if key param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.get()).rejects
      .toThrowError('Missing param: key')
  })
})
