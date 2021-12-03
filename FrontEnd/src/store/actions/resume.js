/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import { UPLOAD_RESUME } from './types';
import { createToastBody, toastOptions } from '../../utils';

export const uploadResumeAction = (key, isApply) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_RESUME,
      payload: key,
    });
    if (isApply) {
      toast.success('Applied Successfully', toastOptions);
    } else {
      toast.success('Uploaded Successfully', toastOptions);
    }
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
