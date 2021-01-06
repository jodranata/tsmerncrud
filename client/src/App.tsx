import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import './css/App.css';
import Memories from './images/memories.png';
import useStyles from './styles';

import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';

import { handleGetPosts } from './store/actions/postActions';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          Memories
        </Typography>
        <img src={Memories} alt="memories" className={classes.image} />
      </AppBar>
      <Grow in>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default App;
