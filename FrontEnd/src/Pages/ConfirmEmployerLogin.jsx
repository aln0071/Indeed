import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import JobSeekerNavbar from '../components/Navbars/JobSeekerNavbar';
import { clearUserDetailsAction } from '../store/actions/user';
import styles from '../styles.scss';

export default function CompanyEmployerLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <JobSeekerNavbar />
      <div className={styles.confirmLoginContainer}>
        Are you sure you want to log out and login as an employer?
        <div className={styles.confirmLoginButtons}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(clearUserDetailsAction());
            }}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={() => history.goBack()}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
