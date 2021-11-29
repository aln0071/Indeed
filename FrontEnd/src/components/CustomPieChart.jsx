/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';

export default function CustomPieChart(props) {
  return (
    <div className="my-2 mx-3" style={{ height: '300px', width: '300px' }}>
      <PieChart data={props.data} />
      <center>
        <span>{props.label}</span>
      </center>
    </div>
  );
}
