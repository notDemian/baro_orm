import multer from 'multer'
import { join } from 'path'

const __public = join(__dirname, '../public')

const storage = multer.diskStorage({
  destination: __public,
  filename: (req, file, cb) => {
    console.log({file})
    cb(null, `${Date.now()}.${file.originalname.split('.').at(-1)}`)
  },
})

type FIELDS = 'pfp'

export default (fieldname: FIELDS) =>
  multer({
    dest: __public,
    storage,
  }).single(fieldname)
