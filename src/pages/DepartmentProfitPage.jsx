import { Button, DatePicker, Form, Select, Table } from 'antd';
import { useState } from 'react'

const DepartmentProfitPage = () => {
  const columns = [
    {
      key: '部署コード',
      title: '部署コード',
      dataIndex: '部署コード'
    },
    {
      key: '部署名',
      title: '部署名',
      dataIndex: '部署名'
    },
    {
      key: '8月',
      title: '8月',
      dataIndex: '8月'
    },
    {
      key: '9月',
      title: '9月',
      dataIndex: '9月'
    }
  ];

  const data = [
    {
      key: '1',
      部署コード: '1',
      部署名: '東京支店',
      '8月': 1000000,
      '9月': 1500000
    },
    {
      key: '2',
      部署コード: '2',
      部署名: '山梨支店',
      '8月': 1500000,
      '9月': 1400000
    },
    {
      key: '3',
      部署コード: '3',
      部署名: '海上コンテナ部署',
      '8月': 5000000,
      '9月': 4500000
    },
    {
      key: '4',
      部署コード: '4',
      部署名: 'トラック部署',
      '8月': 750000,
      '9月': 600000
    },
    {
      key: '5',
      部署コード: '5',
      部署名: '倉庫部署',
      '8月': 800000,
      '9月': 900000
    }
  ];

  return (
    <div className='flex flex-col items-center w-full'>
      <Table dataSource={data} columns={columns} pagination={false} scroll={{x: 'max-content'}} className='w-full'/>
    </div>
  )
}

export default DepartmentProfitPage
