/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import { RootState } from '../../store/store';
import { PostDataResponseType } from '../../store/types';
import Post from './Post/Post';

import useStyles from './styles';

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state: RootState) => state.posts);

  return (
    <div>
      <h3>Posts</h3>
      {posts?.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {posts?.map((post: PostDataResponseType, i: number) => (
            <Fade
              in={!!post._id}
              style={{ transitionDelay: `${i * 500}ms` }}
              key={post._id}
            >
              <Grid item sm={12} key={post._id} lg={5}>
                <Post data={post} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
