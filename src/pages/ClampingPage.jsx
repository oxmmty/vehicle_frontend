import React from 'react';
import { Table, Button, Dropdown, Menu, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ClampingPage = () => {
  const columns = [
    {
      title: '時間',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '配達日',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: '時間',
      dataIndex: 'time2',
      key: 'time2',
    },
    {
      title: '搬出・搬入',
      dataIndex: 'load',
      key: 'load',
    },
    {
      title: '作業先',
      dataIndex: 'workPlace',
      key: 'workPlace',
    },
    {
      title: 'サイズ',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'コンテナ番号',
      dataIndex: 'containerNo',
      key: 'containerNo',
    },
    {
      title: 'シャーシ',
      dataIndex: 'chassis',
      key: 'chassis',
    },
    {
      title: '作業 1',
      dataIndex: 'work1',
      key: 'work1',
    },
    {
      title: '作業 2',
      dataIndex: 'work2',
      key: 'work2',
    },
    // Add more columns as needed
  ];

  const data = [
    {
      key: '1',
      time: '10:00',
      deliveryDate: '2024/01/03',
      time2: '12:00',
      load: '搬入',
      workPlace: '場所A',
      size: 'Large',
      containerNo: '123456',
      chassis: 'シャーシA',
      work1: '作業内容1',
      work2: '作業内容2',
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">リスト作成</Menu.Item>
      <Menu.Item key="2">PDF作成</Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap flex-row w-full justify-between items-center gap-4 px-2">
        <div>
          <Title level={3}>東海運株式会社</Title>
          <Text>2024年1月3日(水)</Text>
        </div>
        <div>
          <Title level={5}>翔風運輸株式会社　担当：渡邉</Title>
          <Text>2024年8月3日(水)</Text>
        </div>
        <Dropdown overlay={menu} trigger={['click']} className="mt-4">
          <Button type="primary">
            Options <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} bordered />
    </div>
  );
};

export default ClampingPage;
