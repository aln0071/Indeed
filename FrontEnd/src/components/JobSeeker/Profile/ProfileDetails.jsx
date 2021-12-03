/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useHistory } from 'react-router-dom';
import { Input } from '@mui/material';
import { Button, IconButton } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LockIcon from '@mui/icons-material/Lock';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';
import Message from '../../Chat/Message';
import '../../styles.css';
import {
  getProfileAction,
  setUserDetailsAction,
} from '../../../store/actions/user';
import { uploadResumeAction } from '../../../store/actions/resume';
import { setOpenChatBox } from '../../../store/actions/message';
import { baseUrl, urls } from '../../../utils/constants';
import { downloadFile } from '../../../utils/endpoints';

function ProfileDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const resumeKey = useSelector((state) => state.resume.resumeKey);
  const [isResume, setIsResume] = useState(resumeKey);
  const onMessage = () => {
    dispatch(setOpenChatBox(true));
  };
  const userProfile = useSelector((state) => state.user);
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const postUserProfile = async () => {
    const url = `${baseUrl}${urls.updateUserProfile}`;
    const body = {
      userId: userProfile.userId,
      resume: resumeKey,
    };
    const headers = {
      // Authorization: token,
    };
    try {
      const res = await axios.post(url, body, { headers });
      console.log('response', res.data);
      // TODO Fetch User Profile
      await dispatch(setUserDetailsAction(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append('resume', file);
    if (fileData) {
      const response = await axios.post(
        `${baseUrl}${urls.uploadResume}`,
        fileData,
      );
      dispatch(uploadResumeAction(response.data.fileKey));
      postUserProfile(response.data.fileKey);
    }
  };

  useEffect(() => {
    dispatch(getProfileAction(userProfile.userId));
  }, []);

  useEffect(() => {
    setIsResume(resumeKey);
  }, [resumeKey]);

  return (
    <div>
      <JobSeekerNavbar />
      <Message />
      <div
        // className="landingpage"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '50px',
        }}
      >
        <Card
          sx={{ minWidth: 700, minHeight: 150 }}
          style={{ marginBottom: '20px' }}
        >
          <CardContent style={{ display: 'flex' }}>
            <Avatar
              alt="Your Name"
              sx={{ width: '56px', height: '56px' }}
              {...stringAvatar(
                userProfile.firstName
                  ? `${userProfile?.firstName} ${userProfile?.lastName}`
                  : 'Your Name',
              )}
            />
            <div style={{ marginLeft: '20px' }}>
              <h1 style={{ margin: 0, lineHeight: 'normal' }}>
                {`${userProfile?.firstName} ${userProfile?.lastName}`}
              </h1>
              <p style={{ margin: 0 }}>
                {`${userProfile?.address?.city} ${userProfile?.address?.zipCode}`}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 700, minHeight: 150 }}
          style={{ marginBottom: '20px' }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontWeight: 'bold' }}
            >
              Get Started
            </Typography>
            {/* If resume exists display here */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  color: 'blue',
                  border: '2px solid blue',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  padding: '14px',
                }}
              >
                <FileUploadIcon />
                <label htmlFor="resumeApply">
                  <Input
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="resumeApply"
                    name="resumeApply"
                    required
                    autoFocus
                    type="file"
                    onChange={(e) => {
                      if (Object.keys(userProfile).length === 0) {
                        history.push('/Login');
                      } else {
                        handleUploadResume(e);
                      }
                    }}
                  />
                  Upload Resume
                </label>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  color: 'blue',
                  border: '2px solid blue',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  padding: '14px',
                }}
                onClick={() => {
                  const url = `${baseUrl}${urls.getImageFromS3.replace(
                    '{key}',
                    resumeKey,
                  )}`;
                  try {
                    downloadFile(url);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <DownloadIcon />
                Download Resume
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  color: 'blue',
                  border: '2px solid blue',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  padding: '14px',
                }}
              >
                <DeleteIcon />
                Delete Resume
              </Button>
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={() => onMessage()}
                style={{
                  color: 'blue',
                  border: '2px solid blue',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  padding: '14px',
                }}
              >
                <MessageIcon />
                Message
              </Button> */}
            </div>
          </CardContent>
        </Card>
        {isEdit ? (
          <EditProfile setEdit={setIsEdit} />
        ) : (
          <Card sx={{ minWidth: 700 }} style={{ marginBottom: '20px' }}>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{ fontWeight: 'bold' }}
                >
                  Contact Information
                </Typography>
                <IconButton
                  style={{ top: '-1px' }}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
              <p style={{ color: 'grey' }}>
                {`${userProfile?.firstName} ${userProfile?.lastName}`}
              </p>
              <p style={{ color: 'grey' }}>
                {userProfile?.email || 'Not Present'}
                <LockIcon fontSize="small" style={{ top: '-5px' }} />
              </p>
              <button
                style={{
                  all: 'unset',
                  fontWeight: 'bold',
                  color: 'grey',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                {userProfile?.mobile || 'Add Phone Number'}
              </button>
              <p style={{ color: 'grey' }}>
                {`${userProfile?.address?.addressLine1}`}
                <LockIcon fontSize="small" style={{ top: '-5px' }} />
              </p>
              <p style={{ color: 'grey' }}>
                {` ${userProfile?.address?.city} ${userProfile?.address?.zipCode}`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
