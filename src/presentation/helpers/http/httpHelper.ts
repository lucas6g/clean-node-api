import { UnauthorizedError } from '../../errors/UnauthorizedError'
import { ServerError } from '../../errors/ServerError'
import { HttpResponse } from '../../protocols/HttpResponse'

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}
export function unauthorized(): HttpResponse {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}
export function serverError(error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(String(error.stack))
  }
}
export function created(data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
export function noContent(): HttpResponse {
  return {
    statusCode: 204,
    body: null
  }
}
export function ok(data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}
export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: error
  }
}
