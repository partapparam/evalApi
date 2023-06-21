const multer = require("multer")
const multerS3 = require("multer-s3")
const { DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3")
const path = require("path")

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
})

// delete an Object from AWS
const deleteImage = async (url) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: url,
    VersionId: "null",
  })

  try {
    const response = await s3.send(command)
    console.log("aws file deletion successful", response)
  } catch (error) {
    console.log(error)
    console.log("Aws file not deleted")
  }
}

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET,
  // We must set the contentType manually, otherwise AWS will set to application/octetStream
  contentType: multerS3.AUTO_CONTENT_TYPE,
  // acl: "public-read",
  metadata: (req, file, callback) => {
    callback(null, { fieldname: file.fieldname })
  },
  key: (req, file, callback) => {
    const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname
    callback(null, fileName)
  },
})

// sanitize files and send error for unsupported files
const sanitizeFile = (file, callback) => {
  // define allowed extensions
  const fileExts = [".png", ".jpg", ".jpeg"]
  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  )
  // mimetype must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image")

  if (isAllowedExt && isAllowedMimeType) {
    return callback(null, true)
    //   no errors
  } else {
    callback("Error: file type not allowed")
  }
}
// Middleware
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback)
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
    // 5mb file size
  },
})

module.exports = { uploadImage, deleteImage }
