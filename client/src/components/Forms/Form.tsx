import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Collapse from '@material-ui/core/Collapse';

import { debounce } from 'throttle-debounce';

import useStyles from './styles';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';
import MuiTagChips from '../MuiComponents/MuiTagChips';

import { PostDetailTypes } from '../../store/types';
import { handleCreatePostAction } from '../../store/actions/postActions';

import encodeBase64 from '../../helpers/convertBase64';
import separateTags from '../../helpers/separateTags';

// import { TagsDataTypes } from '../types';

interface FormErrorType {
  title: string;
  tags: string;
  author: string;
  body: string;
}

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>(['']);
  const [post, setPost] = useState('');
  const [formError, setFormError] = useState<FormErrorType>({
    title: '',
    tags: '',
    author: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState('No File Chosen');

  const handleDebounceTagsArr = debounce(350, (val: string) => {
    const tagsArr = separateTags(val);
    setTags(tagsArr);
  });

  const handleSetTags = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    handleDebounceTagsArr(e.target.value);
  };

  // const handleOnDeleteTags = (chipToDelete: TagsDataTypes) => {
  //   console.log(chipToDelete);
  //   setTags((prevValue: string[]) =>
  //     prevValue.filter((val: string, i: number) => {
  //       if (i !== chipToDelete.key - 1) return val;
  //       return false;
  //     }),
  //   );
  // };

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
    const isTagEmpty = data.tags.filter((tag: string) => tag).length === 0;

    if (!title || !author || !post || isTagEmpty) {
      return Object.keys(data).forEach((field: string) => {
        if (field === 'tags') {
          setFormError((prevValue: FormErrorType) => ({
            ...prevValue,
            [field]: isTagEmpty ? `${field} is required` : '',
          }));
        } else {
          setFormError((prevValue: FormErrorType) => ({
            ...prevValue,
            [field]: data[field] ? '' : `${field} is required`,
          }));
        }
      });
    }
    setFormError({
      title: '',
      tags: '',
      author: '',
      body: '',
    });
    dispatch(handleCreatePostAction(data));
    setTitle('');
    setAuthor('');
    setTags(['']);
    setPost('');
    setSelectedFile('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image) {
      encodeBase64(image, (err: string | null, data?: string) => {
        if (err) return setSelectedFileName(err);
        if (data) {
          setSelectedFileName(image.name);
          setSelectedFile(data);
        }
      });
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
          placeholder={`tags (For multiple tags separate it by ",")`}
          onChange={handleSetTags}
          error={!!formError.tags}
          helperText={formError.tags}
        />
        <Collapse in={tags.filter((tag: string) => tag).length > 0}>
          <MuiTagChips tags={tags} />
        </Collapse>

        <input
          type="file"
          id="input-image"
          onChange={handleImageUpload}
          hidden
        />
        <div className={classes.fileInput}>{selectedFileName}</div>
        <MuiTooltipButton
          title="Post Image"
          placement="top-end"
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
