/* eslint jsx-a11y/anchor-is-valid: 0, jsx-a11y/label-has-associated-control: 0 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import styles from '../../../../styles.scss';

export default function ImageCard({ file, onRemove, onChange }) {
  return (
    <>
      <div className={styles.companyProfilePhotoUploadPreviewContainer}>
        <div className={styles.companyProfilePhotoUploadPreviewPhoto}>
          <img
            alt="preview"
            height="100"
            max-width="200px"
            src={file.preview}
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
          >
            Remove
          </a>
        </div>
        <div>
          <div className={styles.loginInput}>
            <label>Photo Location (optional)</label>
            <TextField
              margin="normal"
              fullWidth
              id="location"
              name="location"
              autoFocus
              onChange={onChange}
              value={file.location}
            />
          </div>
          <div className={styles.loginInput}>
            <label>Caption (required)</label>
            <TextField
              margin="normal"
              fullWidth
              id="caption"
              name="caption"
              autoFocus
              required
              onChange={onChange}
              value={file.caption}
            />
          </div>
        </div>
      </div>
    </>
  );
}

ImageCard.propTypes = {
  file: PropTypes.oneOf([PropTypes.object]).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
