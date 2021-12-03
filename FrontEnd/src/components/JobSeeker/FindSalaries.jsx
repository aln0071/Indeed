/* eslint-disable import/no-cycle */
import React from 'react';
import '../styles.css';
// import salariesImage from '../../images/findsalaries.png';
import {
  makeStyles,
  Button,
  withStyles,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { findSalariesAction } from '../../store/actions/findSalaries';
import styles from '../../styles.scss';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 0,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxSearch: {
    backgroundColor: 'white',
    margin: 0,
    height: '310px',
    backgroundPosition: 'bottom right',
    backgroundImage: 'url(/Images/companyreview.PNG)',
    backgroundRepeat: 'no-repeat',
  },
  outerSearchGrid: {
    marginTop: '50px',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  h3: {
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  h5: {
    color: '#6f78a5',
    fontWeight: '400',
    marginBottom: '70px',
  },
  outlinedInput: {
    border: '2px solid #cccccc',
    borderRadius: '10px',
    width: '300px',
    marginRight: 10,
  },
  formhelperText: {
    color: '#085ff7',
    paddingLeft: '20px',
    cursor: 'pointer',
  },
  companiesHiring: {
    marginTop: '50px',
    marginBottom: '20px',
    backgroundColor: 'white',
    display: 'flex',
  },
  reviewBtnText: {
    color: '#085ff7',
    textDecoration: 'underline',
  },
  companyBtnText: {
    color: '#085ff7',
  },
}));

const SearchButton = withStyles(() => ({
  root: {
    color: '#ffffff',
    backgroundColor: '#085ff7',
    cursor: 'pointer',
    width: '200px',
    borderRadius: '200px',
    height: '53px',
    marginLeft: '30px',
    '&:hover': {
      backgroundColor: '#0542ac',
    },
  },
}))(Button);

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'black',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconEmpty': {
    color: 'black',
  },
});

function FindSalaries() {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const classes = useStyles();

  const search = () => {
    dispatch(findSalariesAction(title, location));
  };

  const salaries = useSelector((state) => state.findSalaries);

  return (
    <>
      <JobSeekerNavbar />
      <div className={styles.findSalariesSection1}>
        <div className={styles.findSalariesSection1Container}>
          <div className={styles.findSalariesSection1Content}>
            <h2>Find a career you&lsquo;ll love</h2>
            <p>
              Explore which careers have the highest job satisfaction, best
              salaries, and more
            </p>
            <div className={styles.findSalariesSection1Input}>
              <TextField
                className={classes.outlinedInput}
                // required
                type="text"
                variant="outlined"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.outlinedInput}
                // required
                type="text"
                variant="outlined"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FmdGoodIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <SearchButton
                type="submit"
                variant="contained"
                onClick={() => search()}
              >
                Search
              </SearchButton>
            </div>
          </div>
        </div>
        {/* <div className={styles.findSalariesSection1Container}>
          <img src={salariesImage} />
        </div> */}
      </div>
      {JSON.stringify(salaries) !== '{}' && (
        <div className={styles.findSalariesSection2}>
          <h3>
            Average salary for
            {' '}
            {title}
            {' '}
            at
            {' '}
            {location}
            {' '}
            is $
            {salaries.averageSalary}
          </h3>
          <h3>
            Top companies for
            {title}
          </h3>
          <div className={styles.findSalariesCardContainer}>
            {salaries.topCompanies.map((company) => (
              <div className={styles.findSalariesCard}>
                <div>
                  <div>
                    <a href={`#/cmp/companyid?companyid=${company.companyId}`}>
                      {company.companyName}
                    </a>
                  </div>
                  <div className={styles.findSalariesCardBottom}>
                    <a href={`#/cmp/companyid?companyid=${company.companyId}`}>
                      <span className={styles.findSalariesCardRating}>
                        {company.averageRating || '0.00'}
                      </span>
                      <StyledRating
                        size="small"
                        name="read-only"
                        value={company.averageRating || '0.00'}
                        readOnly
                      />
                    </a>
                    <a href={`#/cmp/companyid?companyid=${company.companyId}`}>
                      {company.reviewCount || 0}
                      {' '}
                      reviews
                    </a>
                    <a href={`#/cmp/companyid?companyid=${company.companyId}`}>
                      {company.salaryReviewCount || 0}
                      {' '}
                      salaries reported
                    </a>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <a href={`#/cmp/companyid?companyid=${company.companyId}`}>
                    $
                    {parseInt(company.averageSalary, 10).toFixed(2) || 0}
                    <div style={{ color: '#6f6f6f' }}>per year</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FindSalaries;
