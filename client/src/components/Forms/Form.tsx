import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';

import useStyles from './styles';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';
import { PostDetailTypes } from '../../store/types';
import { handleCreatePostAction } from '../../store/actions/postActions';
import toBase64 from '../../helpers/convertBase64';

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
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer>('');
  const [selectedFileName, setSelectedFileName] = useState('Posts image');

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data: PostDetailTypes = {
      title,
      author,
      tags,
      body: post,
      selectedFile,
    };
    // const emptyField = Object.keys(data).filter((key: string) => !data[key]);
    if (!title || !author || !post || !tags) {
      return Object.keys(data).forEach((field: string) =>
        setFormError((prevValue: PostDetailTypes) => ({
          ...prevValue,
          [field]: data[field] ? '' : `${field} is required`,
        })),
      );
    }
    setFormError({
      title: '',
      tags: '',
      author: '',
      body: '',
    });
    dispatch(handleCreatePostAction(data));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image) {
      toBase64(
        image,
        (
          err: string | null,
          data?: string | ArrayBuffer | null | undefined,
        ) => {
          if (err) return setSelectedFileName(err);
          if (data) {
            setSelectedFileName(image.name);
            setSelectedFile(data);
          }
        },
      );
    }
  };
  const handleMuiButtonClick = () => {
    const imageInput = document.querySelector(
      '#input-image',
    ) as HTMLButtonElement;
    imageInput.click();
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
        <input
          type="file"
          id="input-image"
          onChange={handleImageUpload}
          hidden
        />
        <span className={classes.fileInput}>{selectedFileName}</span>
        <MuiTooltipButton
          title="Post Image"
          placement="bottom"
          onClick={handleMuiButtonClick}
          buttonText="Upload image"
          startIcon={<CloudUpload />}
          buttonClassName={`${classes.buttons}`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.buttons}
        >
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
