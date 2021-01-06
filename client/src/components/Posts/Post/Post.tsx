import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';

import { PostDataResponseType } from '../../../store/types';
import {
  handleDeletePostAction,
  handleLikeOrUnlikePost,
} from '../../../store/actions/postActions';
import useStyles from './styles';

type PostComponentType = {
  data: PostDataResponseType;
};

const Post = ({
  data: { author, body, createdAt, likeCount, tags, title, selectedFile, _id },
}: PostComponentType) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const date = new Date(createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLike = (id: string) => {
    dispatch(handleLikeOrUnlikePost(isLike ? 'unlike' : 'like', id));
    setIsLike((prevValue: boolean) => !prevValue);
  };
  const handleDelete = (id: string) => dispatch(handleDeletePostAction(id));

  return (
    <Paper elevation={2} className={classes.paper}>
      <div className={classes.paperHeader}>
        <Typography variant="h6" className={classes.paperTitle}>
          {title}
        </Typography>
        <Typography variant="caption" component="p">
          Posted By {author} | {date}
        </Typography>
      </div>

      <img src={selectedFile} alt="hero" className={classes.paperImage} />
      <div className={classes.paperBody}>
        <Typography variant="body2">{body}</Typography>
      </div>
      <div className={classes.paperFooter}>
        <div className={classes.paperChip}>
          {tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </div>
        <Chip
          label={likeCount}
          variant="outlined"
          icon={
            <IconButton
              size="small"
              onClick={() => handleLike(_id)}
              className={classes.paperAction}
            >
              <FavoriteIcon color={isLike ? 'secondary' : undefined} />
            </IconButton>
          }
        />
      </div>
      <Tooltip
        placement="top"
        className={classes.paperDelete}
        title="Delete Post"
      >
        <IconButton onClick={() => handleDelete(_id)} size="small">
          <DeleteOutlinedIcon color="secondary" className={classes.paperIcon} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default Post;
