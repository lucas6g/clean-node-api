import { Express, Router } from 'express'

import loginRoutes from '../routes/login.routes'
import surveyRoutes from '../routes/survey.routes'

export default function (app: Express): void {
  const router = Router()
  app.use(loginRoutes(router))
  app.use(surveyRoutes(router))

}
