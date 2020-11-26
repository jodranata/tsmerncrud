import Message from '../models/posts.models.js';

export const getMessages = async (req, res) => {
  try {
    const postMessages = await Message.find();
    console.log(postMessages);
    res.status(200).json({ success: true, message: postMessages });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: true, message: err.message });
  }
};

export const postMessage = async (req, res) => {
  const {
    body: { message },
  } = req;
  const newPost = new Message(message);
  try {
    newPost.save();
    res.status(201).json({ success: true, message: 'created post', post: newPost });
  } catch (err) {
    res.status(409).json({ success: true, message: err.message });
  }
};
