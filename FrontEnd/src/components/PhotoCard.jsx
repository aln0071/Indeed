/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { baseUrl } from '../utils/constants';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PhotosCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleAction = (action) => {
    axios
      .get(
        `${baseUrl}indeed/api/admin/photo/review?approved=${action}&id=${props.id}`,
      )
      .then((res) => {
        props.showConfirmationModel(
          action == 'true' ? 'Photo Approved' : 'Photo Declined',
        );
      });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader />
      <CardMedia
        component="img"
        height="350"
        image={`${baseUrl}indeed/files/images/${props.pictureKey}`}
        alt="Paella dish"
      />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing class="d-flex justify-content-around my-3">
        <Button
          variant="contained"
          color="success"
          style={{ margin: '0 10px' }}
          onClick={() => handleAction('true')}
        >
          Approve
          {' '}
          <CheckCircleIcon style={{ height: '14px' }} />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleAction('false')}
        >
          Decline
          {' '}
          <CancelIcon style={{ height: '14px' }} />
        </Button>
      </CardActions>
    </Card>
  );
}
