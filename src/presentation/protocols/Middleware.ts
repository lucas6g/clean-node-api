import { HttpRequest } from './HttpRequest'
import { HttpResponse } from './HttpResponse'

export interface Middleware {

  handle: (request: HttpRequest) => Promise<HttpResponse>
}
