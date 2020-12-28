/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { MuiTagChipsPropTypes, TagsDataTypes } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  tagPaper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  tagChip: {
    margin: theme.spacing(0.5),
  },
}));

const MuiTagChips = ({ tags }: MuiTagChipsPropTypes) => {
  const classes = useStyles();
  const tagsData = tags.map((tag: string, i: number) => ({ key: i + 1, tag }));

  return (
    <Paper component="ul" className={classes.tagPaper}>
      {tagsData.map((val: TagsDataTypes) => {
        return (
          <Chip
            label={val.tag}
            key={val.key}
            className={classes.tagChip}
            // {...(onDelete ? { onDelete: () => onDelete(val) } : {})}
          />
        );
      })}
    </Paper>
  );
};

export default MuiTagChips;
