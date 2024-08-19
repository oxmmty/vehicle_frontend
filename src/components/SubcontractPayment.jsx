import React from 'react';
import Group from './Group';
import { Form, Tabs, Select, Input, DatePicker, TimePicker, Radio, Space } from 'antd';

const TabForm = () => {
  return (
    <div>
      <Form.Item label={"会社名"}>
        <Select defaultValue={1} />
      </Form.Item>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"料金"} style={{ width: 100 }} className='grow'>
          <Select defaultValue={1} />
        </Form.Item>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">課税</Radio>
            <Radio value="{2}">非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group value="{1}">
          <div className='flex flex-col'>
            <Radio value="{1}">自車</Radio>
            <Radio value="{2}">平凡な車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className='flex flex-wrap flex-row items-center gap-x-4'>
        <Form.Item label={"車番1"} className='grow'>
          <Select defaultValue={1} />
        </Form.Item>
        <Form.Item label={"車番2"} className='grow'>
          <Select defaultValue={1} />
        </Form.Item>
        <Form.Item label={"車番3"} className='grow'>
          <Select defaultValue={1} />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=' grow'>
        <Input />
      </Form.Item>
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
const SubcontractPayment = ({ className = '' }) => {
  const tabNames = ['配車1', '配車2', '配車3']
  return (
    <div className={`${className}`}>
      <Group label={"下払"}>
        <Tabs type='card' className='w-full anchor-section' id='下払' items={tabNames.map((item, index) => {
          return {
            label: item,
            key: index,
            children: <TabForm />
          }
        })} />
      </Group>
    </div>
  );
};

export default SubcontractPayment;
