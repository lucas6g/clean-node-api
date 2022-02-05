import { Router } from 'express'
import { adpteMiddleware } from '../adpters/express/expressMiddlewareAdpter'
import { adpteRoute } from '../adpters/express/expressRouteAdpter'
import { makeCreateSurveyController } from '../factories/controllers/createSurveyController/makeCreateSurveyController'
import { makeAuthMiddleware } from '../factories/middlewares/makeAuthMiddleware'
import { makePermitionsMiddleware } from '../factories/middlewares/makePermitionsMiddleware'

export default function loginRoutes(router: Router): Router {
    router
        .post('/survey', adpteMiddleware(makeAuthMiddleware()), adpteMiddleware(makePermitionsMiddleware('admin')), adpteRoute(makeCreateSurveyController()))

    return router
}
