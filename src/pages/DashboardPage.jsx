import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};

const DashboardPage = () => (
  <div className='anchor-section' id='dashboard'>
    Dashboard
  </div>
);
export default DashboardPage;