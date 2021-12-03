/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from '@mui/material';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import StarRateIcon from '@mui/icons-material/StarRate';
import { ColorButton2 } from './customComponents/index';
import salarySvg from '../svg/salary.svg';
import { uploadResumeAction } from '../store/actions/resume';
// import { saveJobAction, unsaveJobAction } from '../store/actions/jobs';

function JobCardExpanded(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [isSaved, setIsSaved] = useState(false);

  // const handleIsSaved = (jobId) => {
  //   if (isSaved) {
  //     setIsSaved(false);
  //     dispatch(saveJobAction(jobId));
  //   } else {
  //     setIsSaved(true);
  //     dispatch(unsaveJobAction(jobId));
  //   }
  // };

  const handleUploadResume = async (e) => {
    const isApply = true;
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append('resume', file);
    if (fileData) {
      const response = await axios.post(
        'http://localhost:3003/indeed/files/upload/resume',
        fileData,
      );
      dispatch(uploadResumeAction(response.data.fileKey, isApply));
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box style={{ boxShadow: '0 4px 2px -2px gray', marginBottom: '20px' }}>
          <Typography
            variant="h5"
            component="div"
            style={{ cursor: 'pointer' }}
            sx={{ fontWeight: 'bold' }}
            onClick={() => {
              history.push(
                `/cmp/companyId?companyId=${props.selectedJob.job.companyId}`,
              );
            }}
          >
            {props.selectedJob.job ? props.selectedJob.job.jobTitle : ''}
          </Typography>
          <Typography color="text.secondary">
            {props.selectedJob.company
              ? props.selectedJob.company.company.companyName
              : ' '}
            . 4.5
            <StarRateIcon
              style={{
                position: 'relative',
                top: '3px',
                left: '3px',
                height: '20px',
              }}
            />
          </Typography>
          <Typography color="text.secondary">
            {props.selectedJob.job ? props.selectedJob.job.address.city : ''}
            {' '}
            {props.selectedJob.job ? props.selectedJob.job.address.state : ''}
            {' '}
            {props.selectedJob.job ? props.selectedJob.job.address.zipcode : ''}
          </Typography>
          <Typography color="text.secondary">Rating: 4.5</Typography>
          <Typography color="text.secondary">Reviews: 5656</Typography>
          <Typography
            sx={{ mt: 2 }}
            color="#595959"
            style={{ width: 'fit-content', background: '#f3f2f1' }}
          >
            <img
              src={salarySvg}
              width="20"
              height="20"
              alt=""
              style={{
                height: '15px',
                textAlign: 'center',
                width: 'fit-content',
              }}
            />
            {/* $115,000 - $128,000 a Year */}
            {' '}
            $
            {props.selectedJob.job ? props.selectedJob.job.jobSalary : ''}
            {' '}
            a
            Year
          </Typography>
          <ColorButton2
            variant="contained"
            style={{ margin: '20px 0 20px 0' }}
            // onClick={() => {
            //   if (Object.keys(user).length === 0) {
            //     history.push('/Login');
            //   } else {
            //     document.getElementById('resume').addEventListener('change');
            //   }
            // }}
          >
            {' '}
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
                  if (Object.keys(user).length === 0) {
                    history.push('/Login');
                  } else {
                    handleUploadResume(e);
                  }
                }}
              />
              Apply Now
            </label>
          </ColorButton2>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
        <Box style={{ marginBottom: '20px' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Job Details
          </Typography>
          <Typography color="text.secondary">
            Salary: $
            {props.selectedJob.job ? props.selectedJob.job.jobSalary : ''}
            {' '}
            a
            Year
            {/* $70,000 - $120,000 a year */}
          </Typography>
          <Typography color="text.secondary">Job Type: Full - time</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Full Job Description
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <ul>
              <li>
                Require Java, PHP or C language. College graduate welcome. We
                are looking for a candidate with background in Linux and Windows
                systems administration to manage our build and test platforms.
                Your responsibilities will include triaging software, hardware
                and infrastructure issues and managing our platform operations
                team based in Fremont, CA. The ideal candidate thrives on being
                in the critical path supporting thousands of developers working
                for billion dollar business lines as well as intimately
                understanding the values of responsiveness, thoroughness and
                teamwork. The ideal candidate is constantly championing and
                implementing efficiency improvements across their domain. You
                will be working directly with our global development and
                operations teams to ensure maximum availability, throughput and
                accuracy in test results. AI experience will be great but not
                necessary. May consider sponsored candidate for H-1 visa. Job
                Type: Full-time
              </li>
            </ul>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
JobCardExpanded.propTypes = {
  // ...prop type definitions here
  selectedJob: PropTypes.object,
};
export default JobCardExpanded;
