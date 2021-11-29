/* eslint jsx-a11y/anchor-is-valid: 0, jsx-a11y/label-has-associated-control: 0 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import styles from '../../../../styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '100vh',
};

export default function UploadPhotosModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const fileUpload = React.useRef(null);
  const [files, setFiles] = React.useState([]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload your company photos
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select 5 or less photos of your workplace or company events.
            {files.length !== 0 && (
              <div>
                {files.map((src, index) => (
                  <>
                    <div
                      className={
                        styles.companyProfilePhotoUploadPreviewContainer
                      }
                    >
                      <div
                        className={styles.companyProfilePhotoUploadPreviewPhoto}
                      >
                        <img
                          alt="preview"
                          height="100"
                          max-width="200px"
                          src={src}
                        />
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            const temp = [...files];
                            temp.splice(index, 1);
                            setFiles(temp);
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
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            )}
            <div className={styles.companyProfilePhotoUploadChoose}>
              <input
                ref={fileUpload}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const dataUrl = reader.result;
                    setFiles([...files, dataUrl]);
                    fileUpload.current.value = '';
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <Button
                variant="contained"
                style={{
                  width: '200px',
                  textTransform: 'none',
                  borderRadius: '20px',
                  fontWeight: '900',
                  background: '#085ff7',
                  marginRight: '30px',
                }}
                onClick={() => fileUpload.current.click()}
              >
                Choose file
              </Button>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </a>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

UploadPhotosModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

UploadPhotosModal.defaultProps = {
  open: false,
  setOpen: () => {},
};
