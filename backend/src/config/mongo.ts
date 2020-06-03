import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

mongoose.connect(String(MONGO_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
