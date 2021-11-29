/* eslint-disable linebreak-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
import React from 'react';

const data = [
  { text: 'Man', value: 200 },
  { text: 'Woman', value: 150 },
  { text: 'Other', value: 100 },
];

export default function CustomBarChart() {
  return (
    <div className="m-3">
      <div className="d-flex justify-content-between align-items-baseline">
        {data.map((d) => (
          <div>
            <div
              style={{ height: d.value, width: '50px', background: 'green' }}
              title={d.text}
              className="m-1"
            >
            </div>
            <span>{d.text}</span>
          </div>
        ))}
      </div>
      <div>
        <hr />
      </div>
      <span>Top 5 companies CEO</span>
    </div>
  );
}
