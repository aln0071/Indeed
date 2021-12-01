/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@material-ui/core';
import LockIcon from '@mui/icons-material/Lock';

function EditProfile(props) {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  return (
    <Card
      sx={{ maxWidth: 600, maxHeight: 600 }}
      style={{ marginBottom: '20px', overflow: 'scroll' }}
    >
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="fname"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            First Name (required)
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="lname"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Last Name (required)
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <p>
          Email Address
          {' '}
          <LockIcon fontSize="small" style={{ color: 'grey' }} />
          <span style={{ fontSize: '10px' }}>
            only provided to employers you apply or respond to.
          </span>
        </p>
        <p>chessghanashri@gmail.com</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="phone"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Phone Number (optional)
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="tel"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <p>
          By submitting the form, I consent to receive calls (including live,
          automated, and recorded calls), texts, and WhatsApp messages from
          Indeed and employers who use Indeed. This consent includes if this
          number is a wireless cellular phone number.
        </p>
        <label
          htmlFor="location"
          style={{ color: '#4b4b4b', fontWeight: 'bold', marginBottom: '5px' }}
        >
          Location
        </label>
        <p>
          Providing a specific location helps Indeed connect you with the right
          job. Your street address is visible only to you.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="street"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Street Address
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="city"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            City – United States
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor="zip"
            style={{
              color: '#4b4b4b',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Postal Code
            <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            style={{
              padding: '13px',
              border: '2px solid gray',
              borderRadius: '5px',
              marginBottom: '15px',
            }}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="filled"
            color="primary"
            style={{
              color: 'white',
              border: '2px solid blue',
              borderRadius: '25px',
              fontWeight: 'bold',
              padding: '10px',
              background: 'blue',
              width: '100px',
            }}
            onClick={() => {
              props.setEdit(false);
            }}
          >
            Save
          </Button>
          <button
            style={{
              all: 'unset',
              fontWeight: 'bold',
              color: 'blue',
              cursor: 'pointer',
            }}
            onClick={() => {
              props.setEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
EditProfile.propTypes = {
  setEdit: PropTypes.func,
  //   email: PropTypes.string,
};
export default EditProfile;
