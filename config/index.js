require('dotenv').config()
const ServerConfig = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
}
const fullPath = `http://${ServerConfig.host}:${ServerConfig.port}`
module.exports = {
    ServerConfig,
    fullPath
}