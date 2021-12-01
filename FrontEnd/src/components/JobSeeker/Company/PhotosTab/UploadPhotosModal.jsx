/* eslint jsx-a11y/anchor-is-valid: 0, jsx-a11y/label-has-associated-control: 0 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../../styles.scss';
import ImageCard from './ImageCard';
import { imageUpload, uploadCompanyPhotos } from '../../../../utils/endpoints';
import { createToastBody, toastOptions } from '../../../../utils';
import { getExternalCompanyProfileAction } from '../../../../store/actions/companyProfile';

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
  const companyId = useSelector(
    (state) => state.externalCompanyProfile.companyId,
  );
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      files.forEach((file) => {
        if (!file.caption) {
          throw new Error('Captions required');
        }
      });
      // upload photos to aws, save the photo data in mongo
      const photos = await imageUpload(files, userId);
      // save photo data to company schema
      await uploadCompanyPhotos({
        pictures: photos.map((photo) => photo._id),
        companyId,
      });
      dispatch(getExternalCompanyProfileAction(companyId));
      toast.success('Success! Images uploaded', toastOptions);
      setOpen(false);
      setFiles([]);
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  };

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
                {files.map((file, index) => (
                  <ImageCard
                    file={file}
                    onRemove={() => {
                      const temp = [...files];
                      temp.splice(index, 1);
                      setFiles(temp);
                    }}
                    onChange={(e) => {
                      const temp = [...files];
                      const selectedFile = temp[index];
                      selectedFile[e.target.id] = e.target.value;
                      temp.splice(index, 1, selectedFile);
                      setFiles(temp);
                    }}
                  />
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
                    const data = {
                      file: e.target.files[0],
                      preview: dataUrl,
                    };
                    setFiles([...files, data]);
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
            <hr />
            {files.length !== 0 && (
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
                onClick={() => handleSubmit()}
              >
                Upload
              </Button>
            )}
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
