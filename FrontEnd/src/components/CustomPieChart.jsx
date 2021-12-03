/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';

export default function CustomPieChart(props) {
  return (
    <div
      className="m-3 border"
      style={{
        height: '350px',
        width: '350px',
        background: '#fff',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        padding: '50px',
      }}
    >
      <PieChart data={props.data} />
      <center>
        <span>{props.label}</span>
      </center>
    </div>
  );
}
