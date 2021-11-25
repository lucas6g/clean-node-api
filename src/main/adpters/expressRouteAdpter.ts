import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/Controller'

export const adpteRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body

    }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 201) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
