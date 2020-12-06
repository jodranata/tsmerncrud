import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  author: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessage = model('PostMessage', postSchema);
export default postMessage;
