import fs from 'fs'
import path from 'path'
import Snap from './model'
const controller = {
  upload (req, res) {
    let image = req.body.image
    let owner = req.body.owner
    let timestamp = req.body.timestamp

    const regex = /^data:.+\/(.+);base64,(.*)$/

    let matches = image.match(regex)
    const data = matches[2]
    const buffer = new Buffer(data, 'base64')
    fs.writeFileSync(path.resolve(__dirname, '../../../public/images/upload') + '/' + owner + '-' + timestamp + '.jpg', buffer)
    res.send({success:'success'})
  },

  example (req, res) {
    var exampleSnap = {
      owner: '5785a5b7b5002ec24062cbcd',
      geometry: { coordinates: [47.86, -122.22] },
      filename: '5785a5b7b5002ec24062cbcd-1468700805377.jpg'
    }

    return Snap.create(exampleSnap, function (err, snap) {
      if (err) {
        return res.json({
          success: false,
          error: 'failed to create Snap'
        })
      }
      return res.json({
        success: true,
        data: snap
      })
    })
  },
  near (req, res) {
    //

  },
  get (req, res) {
    Snap.find({})
    .sort({createdAt: -1})
    .exec(function (err, snaps) {
      if (err) {
        return res.json({
          success: false,
          error: 'failed to get Snaps'
        })
      }
      return res.json({
        success: true,
        data: snaps
      })
    })
  }

}

export default controller
