import Post from '../models/posts.models.js';

export const getPosts = async (req, res) => {
  try {
    const postsData = await Post.find();
    res.status(200).json({ success: true, posts: postsData });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: err.message, posts: null });
  }
};

export const createPost = async (req, res) => {
  const {
    body: { post },
  } = req;
  console.log(req.body);

  const newPost = new Post(post);
  try {
    newPost.save();
    res.status(201).json({ success: true, message: 'created post', post: newPost });
  } catch (err) {
    res.status(409).json({ success: true, message: err.message, post: null });
  }
};
