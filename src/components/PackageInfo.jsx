import React from 'react';
import Group from './Group';
import { Form, Tabs, Select, Input, DatePicker, TimePicker, Radio, Space } from 'antd';

const PackageInfo = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <Group label={"荷物情報"}>
        <div className='grid grid-cols-3 gap-x-1 sm:gap-x-4 w-full'>
          <Form.Item label={"シール番号"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"T/W"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"VOY.No."} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"ホヤン港"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"最終仕向"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"品名"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"個数"} className='w-fit grow'>
            <Input />
          </Form.Item>
          <Form.Item label={"重さ"} className='w-fit grow'>
            <Input placeholder='Kg' />
          </Form.Item>
          <Form.Item label={"荷姿"} className='w-fit grow'>
            <Input />
          </Form.Item>
        </div>
        <div className='flex flex-wrap flex-row items-center gap-4'>
          <Form.Item label={"カット日"} className='grow'>
            <DatePicker className='w-full' />
          </Form.Item>
        </div>
      </Group>
    </div>
  );
};

export default PackageInfo;
