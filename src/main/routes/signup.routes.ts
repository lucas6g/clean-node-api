import { Router } from 'express'
import { adpteRoute } from '../adpters/expressRouteAdpter'
import { makeSignupController } from '../factories/signup/signup'
export default (router: Router): void => {
  router.post('/signup', adpteRoute(makeSignupController()))
}
