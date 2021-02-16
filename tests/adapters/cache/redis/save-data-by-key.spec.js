const SaveDataByKey = require('../../../../src/adapters/cache/redis/save-data-by-key')

const makeSut = () => {
  const sut = new SaveDataByKey({ redisClient: null })
  return { sut }
}

describe('Adapters - Cache - Redis - Save Data By Key', () => {
  it('Should throw an error if key param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.save()).rejects
      .toThrowError('Missing param: key')
  })

  it('Should throw an error if data param is not provided', async () => {
    const { sut } = makeSut()
    await expect(sut.save('key')).rejects
      .toThrowError('Missing param: data')
  })

  it('Should have the correct timeout', async () => {
    const { sut } = makeSut()
    await expect(sut.timeout).toBe(300)
  })
})
