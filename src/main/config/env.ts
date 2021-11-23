export default {
  mongoURL: process.env.MONGO_URL ?? 'mongodb://docker:docker@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.PORT ?? 3333
}
