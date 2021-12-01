/* eslint
  jsx-a11y/label-has-associated-control: 0,
  no-nested-ternary: 0,
  prefer-destructuring: 0
*/
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
import { imageUpload } from '../utils/endpoints';
import { baseUrl, urls } from '../utils/constants';

let newLogo = null;

export default function CompanyProfileEmployer() {
  const companyProfile = useSelector((state) => state.companyProfile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCompanyProfileForEmployerAction());
  }, []);

  const [logo, setLogo] = React.useState('');

  const handleChange = (e) => {
    dispatch(
      setCompanyProfileAction({
        [e.target.id]: e.target.value,
      }),
    );
  };

  const logoRef = React.useRef();

  const logoSrc = logo !== ''
    ? logo
    : companyProfile.logo.pictureKey !== undefined
      ? `${baseUrl}${urls.getImageFromS3.replace(
        '{key}',
        companyProfile.logo.pictureKey,
      )}`
      : logo;

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
          <Grid item padding={3} paddingLeft={5} paddingRight={5}>
            <div className={styles.loginInput}>
              <label>Company Logo</label>
              <br />
              {logoSrc !== '' && (
                <img alt="" src={logoSrc} width="100px" height="100px" />
              )}
              <br />
              <input
                ref={logoRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const { files } = e.target;
                  if (files[0] !== undefined) {
                    newLogo = files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      const dataUrl = reader.result;
                      setLogo(dataUrl);
                    };
                    reader.readAsDataURL(files[0]);
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  logoRef.current.click();
                }}
                style={{ marginTop: '5px' }}
              >
                Choose Logo
              </Button>
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
              onClick={async () => {
                // upload new logo
                if (newLogo !== null) {
                  const photos = await imageUpload(
                    [{ file: newLogo }],
                    user.userId,
                  );
                  dispatch(
                    setCompanyProfileAction({
                      logo: photos[0]._id,
                    }),
                  );
                }
                dispatch(updateCompanyProfileAction());
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
