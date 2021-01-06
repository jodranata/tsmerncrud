import Post from '../models/posts.models.js';

export const getPosts = async (req, res) => {
  try {
    const postsData = await Post.find().sort({ createdAt: 'desc' });
    res.status(200).json({ success: true, posts: postsData });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message, posts: null });
  }
};

export const deletePost = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Post Deleted', post: deletedPost });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const createPost = async (req, res) => {
  const { post } = req;

  const newPost = new Post(post);
  try {
    newPost.save();
    return res
      .status(201)
      .json({ success: true, message: 'created post', post: newPost });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message, post: null });
  }
};

export const likePost = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const selectedPost = await Post.findById(id);
    selectedPost.likeCount += 1;
    selectedPost.save().then(post => res.status(200).json({ success: true, post }));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const selectedPost = await Post.findById(id);
    selectedPost.likeCount = selectedPost.likeCount <= 1 ? 0 : selectedPost.likeCount - 1;
    selectedPost.save().then(post => res.status(200).json({ success: true, post }));
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
