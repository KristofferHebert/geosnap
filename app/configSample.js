// rename to config.js with your own settings.

const config = {
  port: 443,
  env: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  keys: ['dfkjfkjhds45', 'skjhjkhdsfkjhdfs', '...'],
  database: (process.env.NODE_ENV === 'production') ? 'geosnap_production' : 'geosnap_staging'
}

config.port = (config.env === 'development') ? 8001 : config.port

export default config
