import { Router } from 'express'
import { adpteRoute } from '../adpters/express/expressRouteAdpter'
import { makeLoginController } from '../factories/loginController/makeLoginController'
import { makeSignupController } from '../factories/signupController/makeSignupController'
export default (router: Router): void => {
  router.post('/signup', adpteRoute(makeSignupController()))
  router.post('/login', adpteRoute(makeLoginController()))
}
