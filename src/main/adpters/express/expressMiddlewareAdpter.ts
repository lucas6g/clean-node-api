import { NextFunction, Request, Response } from 'express'

import { Middleware } from '../../../presentation/protocols/Middleware'


//disign partener proxy
export const adpteMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers,
      body: req.body,
      accountId: req.accountId

    }
    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {

      Object.assign(req, httpResponse.body)
      next()
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
