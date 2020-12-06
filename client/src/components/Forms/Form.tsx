import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

import { PostDetailTypes } from '../../store/types';
import { handleCreatePostAction } from '../../store/actions/postActions';

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [post, setPost] = useState('');
  const [formError, setFormError] = useState<PostDetailTypes>({
    title: '',
    tags: '',
    author: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data: PostDetailTypes = { title, author, tags, body: post };
    // const emptyField = Object.keys(data).filter((key: string) => !data[key]);
    if (!title || !author || !post || !tags) {
      return Object.keys(data).forEach((field: string) =>
        setFormError((prevValue: PostDetailTypes) => ({
          ...prevValue,
          [field]: data[field] ? '' : `${field} is required`,
        })),
      );
    }
    setFormError({ title: '', tags: '', author: '', body: '' });
    dispatch(handleCreatePostAction(data));
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" color="primary">
        Create a post
      </Typography>
      <form action="post" className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          id="title"
          fullWidth
          value={title}
          placeholder="Title"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => setTitle(e.target.value)}
          error={!!formError.title}
          helperText={formError.title}
        />
        <TextField
          variant="outlined"
          id="post"
          fullWidth
          value={post}
          placeholder="Write your story here..."
          multiline
          rows={4}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => setPost(e.target.value)}
          error={!!formError.body}
          helperText={formError.body}
        />
        <TextField
          variant="outlined"
          id="author"
          fullWidth
          value={author}
          placeholder="author"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => setAuthor(e.target.value)}
          error={!!formError.author}
          helperText={formError.author}
        />
        <TextField
          variant="outlined"
          id="tags"
          fullWidth
          value={tags}
          placeholder="tags"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => setTags(e.target.value)}
          error={!!formError.tags}
          helperText={formError.tags}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
