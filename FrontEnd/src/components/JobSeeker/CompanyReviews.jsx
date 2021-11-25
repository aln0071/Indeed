/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import '../styles.css';

// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
// import { CompanyBox } from "../Layout/Companies/CompanyBox";
// import { useHistory } from 'react-router-dom';
// import { searchCompany, getCompanyReviews } from '../../Redux/CompanyReviews/action';
import SearchIcon from '@material-ui/icons/Search';
// import Rating from '@material-ui/lab/Rating';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  FormHelperText,
  ListItem,
  Card,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
}));

const companiesList = [
  {
    companyId: '1',
    companyName: 'Amazon',
    employerId: '123',
    aboutUs: 'Our mission is most unique',
    // workCulture: { type: String },
    // companyValues: { type: String },
    // companyMission: { type: String },
    // companyVision: { type: String },
    avgRating: 3.5,
    // avgAnnualSalary: { type: Number },
    // totalReviews: { type: Number },
    // totalSalaryReported: { type: Number },
    // pictures: [String],
  },
];

function CompanyReviews() {
  const classes = useStyles();
  const [companies, setCompanies] = useState(companiesList);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  // const isSearching = useSelector(state => state.companies.isSearching);
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const {isAuth} = useSelector(state=>state.login)

  const onTextChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(searchCompany(query))
  };

  // const handleCompanyClick = (id) => {
  //   dispatch(getCompanyReviews(id));
  //   history.push(`/reviews?id=${id}`)
  // }

  // useEffect(() => {
  //   axios.get("https://indeed-mock-server.herokuapp.com/companies")
  //     .then((res) => {
  //       setCompanies(res.data)
  //     })
  //     .catch((err) => console.log(err))
  // },[]);

  const SearchButton = withStyles((theme) => ({
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

  return (
    <>
      <JobSeekerNavbar />
      <Container className={classes.container} maxWidth="xl">
        <Grid container className={classes.boxSearch}>
          <Grid
            item
            container
            className={classes.outerSearchGrid}
            xs={12}
            sm={12}
            md={9}
            lg={8}
            xl={8}
          >
            <Grid item>
              <Typography className={classes.h3} variant="h3">
                Find great places to work
              </Typography>
              <Typography className={classes.h5} variant="h5">
                Discover millions of company reviews
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
              <Grid item>
                <TextField
                  className={classes.outlinedInput}
                  required
                  type="text"
                  variant="outlined"
                  placeholder="Enter a company name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText className={classes.formhelperText}>
                  Do you want to search for salaries?
                </FormHelperText>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.outlinedInput}
                  required
                  type="text"
                  variant="outlined"
                  placeholder="Enter city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <SearchButton type="submit" variant="contained">
                  Search
                </SearchButton>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid
          className={classes.companiesHiring}
          container
          item
          xl={9}
          lg={9}
          md={9}
          sm={11}
          xs={12}
        >
          <Grid item container>
            {/* <Grid item>
              <img src="/Images/location.PNG" alt="location pin" style={{ padding: '5px 0 5px 10px' }} />
            </Grid>
            <Grid item>
              <Typography style={{ paddingTop: '15px' }} variant="h5">Companies Hiring Now</Typography>
            </Grid> */}
          </Grid>
          <Grid container style={{ maxWidth: '1000px' }}>
            {companies.map((company, index) => (
              // <CompanyBox
              //   key={item.id}
              //   logo={item.logo}
              //   name={item.company}
              //   rating={item.ratings}
              //   id={item.id}
              //   handleClick={handleCompanyClick}
              // />
              <ListItem key={index}>
                <div
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '20%' }}>
                      <Typography>{company.companyName || 'ABC'}</Typography>
                      <Typography>{company.avgRating || 3.5}</Typography>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Typography>
                        {company.aboutUs || 'Our companies mission is to grow '}
                      </Typography>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <div>
                        <Button>
                          <Typography>Reviews</Typography>
                        </Button>
                      </div>
                      <div>
                        <Button>
                          <Typography>Salaries</Typography>
                        </Button>
                      </div>
                      <div>
                        <Button>
                          <Typography>Jobs</Typography>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </Grid>
        </Grid>
        {/* <h1 className="children">Company reviews</h1> */}
      </Container>
    </>
  );
}

export default CompanyReviews;
