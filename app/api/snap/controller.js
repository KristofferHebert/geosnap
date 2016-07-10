import fs from 'fs'
import path from 'path'

const controller = {
  upload (req, res) {
    let image = req.body.image
    let userId = req.body.userId
    let timestamp = req.body.timestamp

    const regex = /^data:.+\/(.+);base64,(.*)$/

    let matches = image.match(regex)
    const data = matches[2]
    const buffer = new Buffer(data, 'base64')
    fs.writeFileSync(path.resolve(__dirname, '../../../public/images/upload') + '/' + userId + '-' + timestamp + '.jpg', buffer)
    res.send({success:'success'})
  }
}

export default controller
