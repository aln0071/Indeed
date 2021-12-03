/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { postReviewAction } from '../../../store/actions/review';
import { ColorButton2 } from '../../customComponents';
import Rating from '../../customComponents/Rating';
import { toastOptions } from '../../../utils';

const ReviewModal = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [learning, setLearning] = useState('');
  const [ceoApproval, setCeoApproval] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCeoApprovalChange = (value) => {
    setCeoApproval(value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Post a Review</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Over all Rating
          </Typography>
          <Rating
            value={rating}
            handleChangeRating={handleRatingChange}
            readOnly={false}
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Review Sumary
          </Typography>
          <TextareaAutosize
            minRows={3}
            value={reviewTitle}
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
            placeholder="Enter Review Summary"
            style={{ width: '70%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Your Review
          </Typography>
          <TextareaAutosize
            minRows={3}
            value={reviewDescription}
            onChange={(e) => {
              setReviewDescription(e.target.value);
            }}
            placeholder="Enter Review Summary"
            style={{ width: '70%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            How to prepare ?
          </Typography>
          <TextField
            minRows={3}
            type="number"
            value={learning}
            onChange={(e) => {
              setLearning(e.target.value);
            }}
            placeholder="How to prepare ?"
            style={{ width: '70%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Pros
          </Typography>
          <TextareaAutosize
            minRows={3}
            value={pros}
            onChange={(e) => {
              setPros(e.target.value);
            }}
            placeholder="Enter Pros"
            style={{ width: '70%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Cons
          </Typography>
          <TextareaAutosize
            minRows={3}
            value={cons}
            onChange={(e) => {
              setCons(e.target.value);
            }}
            placeholder="Enter Cons"
            style={{ width: '70%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            CEO Approval
          </Typography>
          <Rating
            value={ceoApproval}
            handleChangeRating={handleCeoApprovalChange}
            readOnly={false}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <ColorButton2
          variant="contained"
          color="primary"
          onClick={() => {
            if (Object.keys(user).length === 0) {
              history.push('/Login');
            } else if (
              reviewDescription
              && reviewTitle
              && pros
              && cons
              && ceoApproval > 0
              && rating > 0
            ) {
              dispatch(
                postReviewAction({
                  companyId: location.search.split('=')[1],
                  userId: user.userId,
                  ceoApproval,
                  rating,
                  reviewDescription,
                  reviewTitle,
                  learning,
                  whatPeopleLiked: pros,
                  areasOfImprovement: cons,
                }),
              );
              props.handleTabChange('', 0);
              // history.push(
              //   `/cmp/companyId?companyId=${location.search.split('=')[1]}`,
              // );
              props.handleClose();
              toast.success('Success! Review Posted', toastOptions);
            } else {
              alert('Fill all the fields');
            }
          }}
        >
          Submit Review
        </ColorButton2>
      </DialogActions>
    </Dialog>
  );
};

ReviewModal.propTypes = {
  // ...prop type definitions here
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleTabChange: PropTypes.func,
};

export default ReviewModal;
