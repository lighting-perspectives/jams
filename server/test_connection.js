const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/config/config.js`)[env]

let sequelize = new Sequelize(config.database, config.username, config.password, config)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
