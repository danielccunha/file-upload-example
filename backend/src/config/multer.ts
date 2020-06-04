import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const generateName = (originalName: string, hash: string) => {
  // Best way I found to remove all white spaces
  originalName = originalName.split(' ').join('_');
  return `${hash}-${originalName}`;
};

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          return callback(err, '');
        }

        const filename = generateName(file.originalname, hash.toString('hex'));
        callback(null, filename);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          return callback(err, '');
        }

        const filename = generateName(file.originalname, hash.toString('hex'));
        callback(null, filename);
      });
    },
  }),
};

const config: multer.Options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage:
    process.env.NODE_ENV === 'production'
      ? storageTypes.s3
      : storageTypes.local,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};

export default config;
