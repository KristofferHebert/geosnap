import mongoose from 'mongoose'
import Auth from '../../auth'

// some inspiration from http://stackoverflow.com/questions/28749471/mongoose-schema-for-geojson-coordinates

const Schema = mongoose.Schema

const SnapSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  geometry: { type: { type: String, default: 'Point' }, coordinates: [Number] },
  filename: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })


const SnapModel = mongoose.model('snap', SnapSchema)

export default SnapModel
