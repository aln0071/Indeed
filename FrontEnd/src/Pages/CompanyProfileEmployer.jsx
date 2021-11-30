/* eslint jsx-a11y/label-has-associated-control: 0 */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles.scss';
import EmployerNavbar from '../components/Navbars/EmployerNavbar';
import {
  getCompanyProfileForEmployerAction,
  setCompanyProfileAction,
  updateCompanyProfileAction,
} from '../store/actions/companyProfile';

export default function CompanyProfileEmployer() {
  const companyProfile = useSelector((state) => state.companyProfile);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCompanyProfileForEmployerAction());
  }, []);

  const handleChange = (e) => {
    dispatch(
      setCompanyProfileAction({
        [e.target.id]: e.target.value,
      }),
    );
  };

  return (
    <>
      <EmployerNavbar />
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Name</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.companyName}
                margin="normal"
                required
                fullWidth
                id="companyName"
                name="companyName"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>About Us</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.aboutUs}
                margin="normal"
                required
                fullWidth
                id="aboutUs"
                name="aboutUs"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Work Culture</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.workCulture}
                margin="normal"
                required
                fullWidth
                id="workCulture"
                name="workCulture"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Values</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.companyValues}
                margin="normal"
                required
                fullWidth
                id="companyValues"
                name="companyValues"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Mission</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.companyMission}
                margin="normal"
                required
                fullWidth
                id="companyMission"
                name="companyMission"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Vision</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.companyVision}
                margin="normal"
                required
                fullWidth
                id="companyVision"
                name="companyVision"
              />
            </div>
          </Grid>
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Website</label>
              <TextField
                onChange={(e) => handleChange(e)}
                value={companyProfile.website}
                margin="normal"
                required
                fullWidth
                id="website"
                name="website"
              />
            </div>
          </Grid>
          <Grid
            item
            paddingTop={1}
            paddingBottom={10}
            paddingLeft={5}
            paddingRight={5}
          >
            <Button
              variant="contained"
              onClick={() => dispatch(updateCompanyProfileAction())}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
