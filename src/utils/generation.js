import cryptoRandomString from 'crypto-random-string'

export const generationName = () => {
  return cryptoRandomString({ length: 10 })
}
