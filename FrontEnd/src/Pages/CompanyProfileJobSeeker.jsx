import React from 'react';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import JobSeekerNavbar from '../components/Navbars/JobSeekerNavbar';
import styles from '../styles.scss';
import banner from '../images/banner.jpeg';
import logo from '../images/cmplogo.jpeg';
import CompanyTabs from '../components/JobSeeker/Company/CompanyTabs';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'white',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconEmpty': {
    color: 'white',
  },
});

export default function CompanyProfileJobSeeker() {
  return (
    <>
      <JobSeekerNavbar />
      <div style={{ backgroundColor: '#232f3e' }}>
        <div
          className={styles.companyProfileBanner}
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className={styles.companyProfileHeader}>
          <div className={styles.companyProfileHeaderSection1}>
            <div className={styles.companyProfileHeaderLogo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={styles.companyProfileHeaderDetails}>
              <div className={styles.companyProfileHeaderName}>Amazon.com</div>
              <div className={styles.companyProfileHeaderDetailsSection2}>
                <div className={styles.companyProfileHeaderScore}>62</div>
                <div className={styles.companyProfileHeaderReviews}>
                  <div>3.7</div>
                  <StyledRating
                    size="small"
                    name="read-only"
                    value={3.7}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.companyProfileHeaderSection2}>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'white',
                color: '#232f3e',
                textTransform: 'none',
                marginBottom: '3px',
                width: '180px',
                borderRadius: '10px',
                fontWeight: '900',
              }}
            >
              Follow
            </Button>
            Get weelky updates, new jobs, and reviews
          </div>
        </div>
      </div>
      <CompanyTabs />
    </>
  );
}
