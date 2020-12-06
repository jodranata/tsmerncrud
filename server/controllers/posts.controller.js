import Post from '../models/posts.models.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();
    console.log(postMessages);
    res.status(200).json({ success: true, message: postMessages });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: true, message: err.message });
  }
};

export const createPost = async (req, res) => {
  const {
    body: { post },
  } = req;
  console.log(req.body);

  // const newPost = new Post(post);
  // try {
  //   newPost.save();
  //   res.status(201).json({ success: true, message: 'created post', post: newPost });
  // } catch (err) {
  //   res.status(409).json({ success: true, message: err.message });
  // }
};
