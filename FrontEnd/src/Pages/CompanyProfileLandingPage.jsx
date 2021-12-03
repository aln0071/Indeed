import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EmployerNavbar from '../components/Navbars/EmployerNavbar';
import Image1 from '../svg/image1.svg';
import styles from '../styles.scss';

export default function CompanyProfileEmployerLandingPage() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <div>
      <EmployerNavbar />
      <div className={styles.employerLandingContainer}>
        <div className={styles.employerLandingSection1}>
          <div>
            <h1>You&apos;re here to hire.</h1>
            <h1>We&apos;re here to help.</h1>
            <p>
              Post your job, interview candidates, and make offers all on
              Indeed. Start hiring today.
            </p>
            <Button
              variant="contained"
              className={styles.employerLandingSection1Button}
              onClick={async () => {
                if (!user.userId) {
                  history.push('/login');
                } else {
                  history.push('/employer/PostJob');
                }
              }}
            >
              Post a job
            </Button>
          </div>
          <div>
            <img src={Image1} width="570px" alt="Section1" />
          </div>
        </div>
      </div>
    </div>
  );
}
