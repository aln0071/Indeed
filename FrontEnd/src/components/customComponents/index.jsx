import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

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
    color: '#fff',
    backgroundColor: '#2557a7 !important',
    '&:hover': {
      backgroundColor: '#2557a7 !important',
      opacity: 0.9,
    },
  },
}))(Button);

export const ColorButton3 = withStyles(() => ({
  root: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#085ff7',
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
