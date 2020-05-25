module.exports = {
  verify: {
    Deafault: require('./Verifications/veryify'),
    SuperAdmin: require('./Verifications/verifySuperAdmin')
  },
  Multer: require('./FilePlugins/Multer')
}