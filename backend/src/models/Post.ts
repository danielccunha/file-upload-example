import { Schema, model, Document } from 'mongoose';

interface PostInterface extends Document {
  name: string;
  number: Number;
  key: string;
  string: string;
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

export default model<PostInterface>('Post', PostSchema);
