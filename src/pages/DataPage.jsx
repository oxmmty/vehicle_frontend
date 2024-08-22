import React from 'react';
import { Button, Table } from 'antd';
import Mail from 'src/components/Mail';
import Identify from 'src/components/Identify';
import Establish from 'src/components/Establish';
import Color from 'src/components/Color';

const DataPage = () => {
  const identify = {
    identify: 'A',
    name: '本社',
    code: '1234',
    confirm: 'Yes'

  };
  const establish = {
    code: 'A',
    name: '本社',
    date: '2024/6/18',
    number: '1'
  };
  const color = {
    up: '#FFF2CC',
    only: '#ffffff',
    deliver: '#F8CBAD',
    back: '#DDEBF7',
    tentative: '#BDD7EE',
    request: '#A9D08E',
    sent: '#BFBFBF',
    on: '#FFD966'
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <Identify data={identify} className='w-full' />
      <Establish data={establish} className='w-full' />
      <Color data={color} className='w-full' />
    </div>
  );
};

export default DataPage;
