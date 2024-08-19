import React from 'react';
import Group from './Group';
import { Form, Tabs, Select, Input, DatePicker, TimePicker, Radio, Space } from 'antd';

const distinguish = [
  {
    value: 0,
    label: '実入り取り',
  },
  {
    value: 1,
    label: '空バン取り',
  },
  {
    value: 2,
    label: '実入り取りCRU',
  }
]

const Delivery1 = () => {
  return (
    <div>
      <Form.Item label={"配達先"} required>
        <div className='flex flex-wrap flex-row items-center gap-4'>
          <Select defaultValue={1} style={{ width: 200 }} className='grow' options={distinguish} />
        </div>
      </Form.Item>
      <Form.Item label={"住所"}>
        <div className='flex flex-wrap flex-row items-center gap-4'>
          <Input className='w-fit grow' />
        </div>
      </Form.Item>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"TEL"} className='w-fit grow'>
          <Input />
        </Form.Item>
        <Form.Item label={"担当者"} className='w-fit grow'>
          <Input />
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className='flex flex-wrap flex-row items-center gap-4'>
          <DatePicker className='grow' />
        </div>
      </Form.Item>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item required label={"配達日"} className='grow'>
          <DatePicker className='w-full' />
        </Form.Item>
        <Form.Item label={"配達時間"} className='grow'>
          <TimePicker className='w-full' />
        </Form.Item>
      </div>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"基本料金"} className='grow'>
          <Select defaultValue={1} className='w-full' options={distinguish} />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"3軸料金"} className='grow'>
          <Select defaultValue={1} className='w-full' options={distinguish} />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"CRU変更料金"} className='grow'>
          <Select defaultValue={1} className='w-full' options={distinguish} />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className='grow'>
          <Input required className='w-full' />
        </Form.Item>
      </div>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"スケール費"} className='grow w-32'>
          <Input required className='w-full' />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className='grow w-32'>
          <Input required className='w-full' />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"その他費用"} className='grow w-32'>
          <Input required className='w-full' />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  )
}

const Delivery2 = () => {
  return (
    <div>
      2
    </div>
  )
}

const Delivery3 = () => {
  return (
    <div>
      3
    </div>
  )
}

const Delivery = ({ className = '' }) => {
  const deliveryTab = ['配達1', '配達2', '配達3'];
  const dialogComponent = [<Delivery1 />, <Delivery2 />, <Delivery3 />];
  return (
    <div className={`${className}`}>
      <Group label={"配達"}>
        <Tabs id='配達' className='anchor-section' type='card' items={deliveryTab.map((item, index) => {
          return {
            label: item,
            key: index,
            children: dialogComponent[index]
          }
        })} />
      </Group>
    </div>
  );
};

export default Delivery;
