
const config = {
  port: 8001,
  env: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  keys: ['dfkjfkjhds45', 'skjhjkhdsfkjhdfs', '...'],
  database: (process.env.NODE_ENV === 'production') ? 'geosnap_production' : 'geosnap_staging'
}

export default config
