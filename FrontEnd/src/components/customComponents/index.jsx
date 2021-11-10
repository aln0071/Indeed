import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const ColorButton = withStyles(() => ({
  root: {
    color: '#fff',
    backgroundColor: '#6792f0',
    '&:hover': {
      backgroundColor: '#2557a7',
    },
    borderRadius: '10px',
  },
}))(Button);

export const ColorButton2 = withStyles(() => ({
  root: {
    color: '#222',
    backgroundColor: '#C4AE78',
    '&:hover': {
      backgroundColor: '#C4AE78',
      opacity: 0.9,
    },
  },
}))(Button);

export const ColorButton3 = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#222',
    textTransform: 'none',
    '&:hover': {
      opacity: 0.6,
    },
  },
}))(Button);

export const ColorButton4 = withStyles(() => ({
  root: {
    color: '#222',
    backgroundColor: '#87cefa',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#87cefa',
      opacity: 0.9,
    },
  },
}))(Button);
