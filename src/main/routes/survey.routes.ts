import { Router } from 'express'
import { adpteMiddleware } from '../adpters/express/expressMiddlewareAdpter'
import { adpteRoute } from '../adpters/express/expressRouteAdpter'
import { makeCreateSurveyController } from '../factories/controllers/createSurveyController/makeCreateSurveyController'
import { makeAuthMiddleware } from '../factories/middlewares/makeAuthMiddleware'

export default function loginRoutes(router: Router): Router {


    router.post('/survey', adpteMiddleware(makeAuthMiddleware('admin')), adpteRoute(makeCreateSurveyController()))

    return router
}







