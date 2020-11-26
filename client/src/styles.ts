import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(237,237,237)',
  },
  heading: {
    color: 'rgba(0, 101, 128,1)',
  },
  image: {
    marginLeft: '15px',
    maxHeight: '60px',
  },
}));
