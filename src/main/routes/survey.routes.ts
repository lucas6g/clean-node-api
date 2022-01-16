import { Router } from 'express'
import { adpteRoute } from '../adpters/express/expressRouteAdpter'
import { makeCreateSurveyController } from '../factories/controllers/createSurveyController/makeCreateSurveyController'

export default function loginRoutes(router: Router): Router {
    router.post('/survey', adpteRoute(makeCreateSurveyController()))

    return router
}







