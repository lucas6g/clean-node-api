import { Express } from 'express'

import loginRoutes from '../routes/login.routes'

export default function (app: Express): void {

  app.use(loginRoutes)


}
