import React from 'react';

// this object stores the options applied to toasts in the project
export const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// function to create toast message from error
export const createToastBody = (error) => (
  <div>
    <b>Error:</b>
    {' '}
    {error.message}
  </div>
);
