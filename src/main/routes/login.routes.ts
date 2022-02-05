import { Router } from 'express'
import { adpteRoute } from '../adpters/express/expressRouteAdpter'
import { makeLoginController } from '../factories/controllers/loginController/makeLoginController'
import { makeSignupController } from '../factories/controllers/signupController/makeSignupController'
export default function loginRoutes(router: Router): Router {
  router.post('/signup', adpteRoute(makeSignupController()))
  router.post('/login', adpteRoute(makeLoginController()))
  return router
}
