/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/jsx-indent */
/* eslint-disable linebreak-style */
import React from 'react';

const color = ['#FFAF00', '#1BAA2F', '#007ED6', '#26D7AE', '#9C46D0'];
export default function CustomBarChart(props) {
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
      <div className="d-flex justify-content-between align-items-baseline">
        {props.data.map((d, index) => (
          <div>
            <div
              style={{
                height: d.value * 50,
                width: '50px',
                background: color[index],
              }}
              title={d.value}
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
      <span>{props.title}</span>
    </div>
  );
}
