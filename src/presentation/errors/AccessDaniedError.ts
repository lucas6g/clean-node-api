export class AccessDaniedError extends Error {
  constructor() {
    super('Access Danied')
    this.name = 'AccessDaniedError'
  }
}
