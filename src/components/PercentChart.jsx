import React from 'react';
import "src/assets/styles/Table.css";

const PercentChart = ({ data, show = true, ...props }) => {
  const color = ['#4472C4', '#FBE5D6', '#F2F2F2', '#FFC000'];
  return (
    <div className={`${props.className} overflow-auto`}>
      <table className='m-auto max-w-20'>
        <tr style={{backgroundColor: color[3], height: data.benefit}} className={`flex flex-col justify-center items-center`}>{show ? data.benefit + '%' : ''}</tr>
        <tr style={{backgroundColor: color[2], height: data.expenses}} className={`flex flex-col justify-center items-center`}>{show ? data.expenses + '%' : ''}</tr>
        <tr style={{backgroundColor: color[1], height: data.depreciation}} className={`flex flex-col justify-center items-center`}>{show ? data.depreciation + '%' : ''}</tr>
        <tr style={{backgroundColor: color[0], height: data.fee}} className={`flex flex-col justify-center items-center`}>{show ? data.fee + '%' : ''}</tr>
      </table>
    </div >
  );
};

export default PercentChart;