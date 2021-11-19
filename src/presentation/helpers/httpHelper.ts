import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../protocols/Http'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}
export function serverError (): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
export function created (data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
