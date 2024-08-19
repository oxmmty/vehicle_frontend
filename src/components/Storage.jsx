import React from 'react';
import Group from './Group';
import { Form, Tabs, Select, Input, DatePicker, TimePicker, Radio, Space } from 'antd';

const { TextArea } = Input;

const SubcontractPayment = ({ className = '' }) => {
  const tabNames = ['配車1', '配車2', '配車3']
  return (
    <div className={`${className}`}>
      <Group label={"保管"}>
        <Form.Item label={"保管場所"}>
          <Select defaultValue={1} />
        </Form.Item>
        <div className='flex flex-wrap flex-row items-center gap-x-4'>
          <Form.Item label={"入庫日"} style={{ width: 100 }} className='grow'>
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item label={"出庫日"} style={{ width: 100 }} className='grow'>
            <DatePicker className='w-full' />
          </Form.Item>
        </div>
        <Group label={"料金"}>
          <div className='flex flex-wrap flex-row items-center gap-x-4'>
            <Form.Item label={"荷主リフトオフ"} className='grow w-32'>
              <Input required className='w-full' />
            </Form.Item>
            <Form.Item label={"荷主リフトオン"} className='grow w-32'>
              <Input required className='w-full' />
            </Form.Item>
            <Form.Item label={"荷主保管/日"} className='grow w-32'>
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
            <Form.Item label={"下払リフトオフ"} className='grow w-32'>
              <Input required className='w-full' />
            </Form.Item>
            <Form.Item label={"下払リフトオン"} className='grow w-32'>
              <Input required className='w-full' />
            </Form.Item>
            <Form.Item label={"下払保管/日"} className='grow w-32'>
              <Input required className='w-full' />
            </Form.Item>
            <Radio.Group value="{1}">
              <div className='flex flex-col'>
                <Radio value="{1}">課税</Radio>
                <Radio value="{2}">非課税</Radio>
              </div>
            </Radio.Group>
          </div>
        </Group>
        <Group label={"備考"}>
          <Form.Item label={"リクエストフォーム備考欄"} rules={[{ required: true }]}>
            <div className='flex flex-wrap flex-row items-center gap-x-4 anchor-section' id='備考'>
              <TextArea rows={4} className='grow' />
            </div>
          </Form.Item>
          <Form.Item label={"送り状・受領書備考欄"} rules={[{ required: true }]}>
            <div className='flex flex-wrap flex-row items-center gap-x-4'>
              <TextArea rows={4} className='grow' />
            </div>
          </Form.Item>
        </Group>
      </Group>
    </div>
  );
};

export default SubcontractPayment;
