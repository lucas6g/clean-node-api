export default {
  mongoURL: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/gssapiServiceName=mongodb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  port: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? '076cfdef19d43a90dcbcf4d7f13f1f0a82b9eb64'
}
