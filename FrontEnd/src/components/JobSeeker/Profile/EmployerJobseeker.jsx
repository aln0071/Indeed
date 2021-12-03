/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import { Button } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import DownloadIcon from '@mui/icons-material/Download';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch } from 'react-redux';
import EditProfile from './EditProfile';
import Message from '../../Chat/Message';
import '../../styles.css';
import { setOpenChatBox } from '../../../store/actions/message';
import EmployerNavbar from '../../Navbars/EmployerNavbar';
import { baseUrl } from '../../../utils/constants';

function EmployerJobseekerProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();
  const onMessage = () => {
    dispatch(setOpenChatBox(true));
  };
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  useEffect(async () => {
    const userId = sessionStorage.getItem('selectedUser');
    const response = await axios.get(
      `${baseUrl}indeed/user/UserDetailsForId/${userId}`,
    );
    setUserProfile(response.data);
  }, []);

  return (
    <div>
      <EmployerNavbar />
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
                `${userProfile?.firstName} ${userProfile?.lastName}`,
              )}
            />
            <div style={{ marginLeft: '20px' }}>
              <h1 style={{ margin: 0, lineHeight: 'normal' }}>
                {userProfile?.firstName}
                {' '}
                {userProfile?.lastName}
              </h1>
              <p style={{ margin: 0 }}>San Jose, CA</p>
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
                <DownloadIcon />
                Download Resume
              </Button>
              <Button
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
              </Button>
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

export default EmployerJobseekerProfile;
