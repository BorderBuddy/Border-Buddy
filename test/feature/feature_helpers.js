import { Traveler } from '../../database/models'

export function cleanDatabase () {
  return Promise.all([
    Traveler.truncate()
  ])
}

export function rootURL (path) {
  const pathString = path || ''
  return 'http://localhost:' + process.env.TEST_PORT + pathString
}
