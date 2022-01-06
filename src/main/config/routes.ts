import { Express, Router } from 'express'

import { readdirSync } from 'fs'

export default function (app: Express): void {
  const router = Router()
  app.use(router)

  // eslint-disable-next-line node/no-path-concat
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.includes('.spec.')) {
      return (await import(`../routes/${file}`)).default(router)
    }
  })
}
