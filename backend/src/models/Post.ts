import { Schema, model, Document } from 'mongoose';
import aws from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const s3 = new aws.S3();

interface PostInterface extends Document {
  name: string;
  number: Number;
  key: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema(
  {
    name: String,
    size: Number,
    key: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

PostSchema.pre<PostInterface>('save', function () {
  if (!this.url) {
    const { APP_URL } = process.env;
    this.url = `${APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre<PostInterface>('remove', function () {
  if (process.env.NODE_ENV === 'production') {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
    );
  }
});

export default model<PostInterface>('Post', PostSchema);
