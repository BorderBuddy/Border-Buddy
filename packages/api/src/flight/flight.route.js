import controller from './controller/flight'

const base = '/api/flight'

export default app => {
  app.post(base + '/verify', controller.verifyFlight)
  app.get(base + '/code', controller.getCode)
}
