import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > *': {
      margin: '8px 0',
    },
  },
  buttons: {
    width: '50%',
    minWidth: '150px',
    margin: '5px auto',
  },
  fileInput: {
    textAlign: 'center',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
