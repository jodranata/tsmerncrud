/* eslint-disable no-underscore-dangle */
import { validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    return fs.readFile(
      path.resolve(__dirname, '../images/721011.jpg'),
      { encoding: 'base64' },
      (err, encoded) => {
        if (err) throw new Error('cannot open file');
        const defImg = `data:image/jpeg;base64,${encoded}`;
        const validPost = {
          ...post,
          selectedFile: defImg,
        };
        req.post = validPost;
        return next();
      },
    );
  }
  req.post = post;
  return next();
};

export default formEmptyValidation;
