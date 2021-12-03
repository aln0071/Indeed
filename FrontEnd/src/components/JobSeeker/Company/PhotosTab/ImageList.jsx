import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../../styles.scss';
import { baseUrl, urls } from '../../../../utils/constants';

export default function ImageList() {
  const pictures = useSelector(
    (state) => state.externalCompanyProfile.pictures,
  );
  return (
    <div className={styles.companyProfilePhotosList}>
      {pictures.map((picture) => (
        <div className={styles.companyProfilePhotosListImageContainer}>
          <img
            alt=""
            src={`${baseUrl}${urls.getImageFromS3.replace(
              '{key}',
              picture.pictureKey,
            )}`}
            loading="lazy"
          />
          <div className={styles.companyProfilePhotosListImageOverlay}>
            <div
              className={styles.companyProfilePhotosListImageOverlayContents}
            >
              {picture.caption}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
