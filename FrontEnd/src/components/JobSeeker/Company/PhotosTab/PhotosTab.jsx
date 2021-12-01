import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../../styles.scss';
import UploadPhotosModal from './UploadPhotosModal';
import ImageList from './ImageList';

export default function PhotosTab() {
  const [isModalOpen, setOpen] = useState(false);
  const companyProfile = useSelector((state) => state.externalCompanyProfile);
  return (
    <div className={styles.companyProfileTabBodyContainer}>
      <h2>
        {companyProfile.companyName}
        {' '}
        Photos
      </h2>
      <ImageList />
      <div>
        <Button
          variant="contained"
          style={{
            width: '200px',
            textTransform: 'none',
            borderRadius: '20px',
            fontWeight: '900',
            background: '#085ff7',
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <span style={{ padding: '4px 0px' }}>Upload a photo</span>
        </Button>
      </div>
      <UploadPhotosModal open={isModalOpen} setOpen={setOpen} />
    </div>
  );
}
