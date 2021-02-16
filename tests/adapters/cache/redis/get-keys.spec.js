const GetKeys = require('../../../../src/adapters/cache/redis/get-keys')

const makeSut = () => {
  const sut = new GetKeys({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Get Keys', () => {
  it('Should throw an error if pattern param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.get()).rejects
      .toThrowError('Missing param: pattern')
  })
})
