import {
  index,
  create,
  show,
  destroy,
  me,
  changePassword,
  update
} from './user.controller'
import { protectedEndpoint } from '../auth/auth.service'

const base = '/api/user'

export default (app) => {
  app.get(base + '/', protectedEndpoint(index))
  // FIXME: This route doesn't work doesn't, pass id from signed token
  app.get(base + '/me', protectedEndpoint(me))
  app.get(base + '/:id', protectedEndpoint(show))
  app.post(base + '/', protectedEndpoint(create))
  app.put(base + '/:id', protectedEndpoint(update))
  app.put(base + '/:id/password', protectedEndpoint(changePassword))
  app.delete(base + '/:id', protectedEndpoint(destroy))
}
