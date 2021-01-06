import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '7px 14px',
    backgroundColor: 'rgb(249,249,249)',
    alignItems: 'center',
    position: 'relative',
    '& > *': {
      margin: '8px 0',
    },
  },
  paperDelete: {
    position: 'absolute',
    top: '4px',
    right: '3px',
  },
  paperHeader: {
    width: '100%',
    textTransform: 'capitalize',
    '& > p': {
      marginTop: '-3px',
      marginLeft: '1px',
      color: 'rgb(141,141,141)',
    },
  },
  paperTitle: {
    textTransform: 'uppercase',
    fontWeight: 700,
    color: 'rgb(74,84,172)',
    lineHeight: 1.2,
  },
  paperBody: {
    width: '100%',
    textAlign: 'justify',
  },
  paperImage: {
    maxWidth: '100%',
  },
  paperFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  paperChip: {
    '& > *': {
      margin: '0px 3px',
    },
  },
  paperAction: {
    '&:hover': {
      backgroundColor: 'rgba(245,0,87,0.18)',
    },
  },
  paperIcon: {
    color: 'rgba(192, 50, 69, 0.76)',
    fontSize: '1rem',
  },
});
