import { validationResult } from 'express-validator';

const formEmptyValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(err => err.msg);
    return res.status(422).json({ success: false, message: 'Error', error: firstError });
  }

  const {
    body: { post },
  } = req;
  const postErr = {};

  Object.keys(post)
    .filter(key => key !== 'selectedFile')
    .forEach(key => {
      if (!post[key]) postErr[key] = `${key} cannot be empty`;
    });
  if (Object.values(postErr).filter(val => val).length > 0) {
    res
      .status(400)
      .json({ success: false, message: 'Error creating post', error: postErr });
    throw new Error(postErr);
  }
  if (!Object.prototype.hasOwnProperty.call(post, 'selectedFile') || !post.selectedFile) {
    const validPost = {
      ...post,
      selectedFile: '',
    };

    req.post = validPost;
    return next();
  }

  req.post = post;
  return next();
};

export default formEmptyValidation;
