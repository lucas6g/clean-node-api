export default {
  mongoURL: process.env.MONGO_URL ?? 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? '076cfdef19d43a90dcbcf4d7f13f1f0a82b9eb64'
}
