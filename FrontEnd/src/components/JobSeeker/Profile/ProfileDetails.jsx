/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, IconButton } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LockIcon from '@mui/icons-material/Lock';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from './EditProfile';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';
import '../../styles.css';

function ProfileDetails() {
  const [isEdit, setIsEdit] = useState(false);
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <div>
      <JobSeekerNavbar />
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
          sx={{ minWidth: 600, minHeight: 150 }}
          style={{ marginBottom: '20px' }}
        >
          <CardContent style={{ display: 'flex' }}>
            <Avatar
              alt="Your Name"
              sx={{ width: '56px', height: '56px' }}
              {...stringAvatar('Your Name')}
            />
            <div style={{ marginLeft: '20px' }}>
              <h1 style={{ margin: 0, lineHeight: 'normal' }}>Your Name</h1>
              <p style={{ margin: 0 }}>San Jose, CA</p>
            </div>
          </CardContent>
        </Card>
        <Card
          sx={{ minWidth: 600, minHeight: 150 }}
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
                Upload Resume
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
            </div>
          </CardContent>
        </Card>
        {isEdit ? (
          <EditProfile setEdit={setIsEdit} />
        ) : (
          <Card sx={{ minWidth: 600 }} style={{ marginBottom: '20px' }}>
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
              <p style={{ color: 'grey' }}>Ghanashri Mariyanna</p>
              <p style={{ color: 'grey' }}>
                chessghanashri@gmail.com
                {' '}
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
                Add Phone Number
              </button>
              <p style={{ color: 'grey' }}>
                171 W Julian St, #208
                {' '}
                <LockIcon fontSize="small" style={{ top: '-5px' }} />
              </p>
              <p style={{ color: 'grey' }}>San Jose, CA 95110</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
