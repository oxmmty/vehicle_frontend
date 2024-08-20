import { Button, DatePicker, Form, Select, Table } from 'antd';
import { useState } from 'react'

const ContainerPage = () => {
  const columns = [
    {
      title: '受注コード',
      dataIndex: '受注コード',
      key: '受注コード'
    },
    {
      title: '日付',
      dataIndex: '日付',
      key: '日付'
    },
    {
      title: '顧客名',
      dataIndex: '顧客名',
      key: '顧客名'
    },
    {
      title: '積地',
      dataIndex: '積地',
      key: '積地'
    },
    {
      title: '配達先',
      dataIndex: '配達先',
      key: '配達先'
    },
    {
      title: '船社',
      dataIndex: '船社',
      key: '船社'
    },
    {
      title: '下払会社1',
      dataIndex: '下払会社1',
      key: '下払会社1'
    },
    {
      title: '下払会社2',
      dataIndex: '下払会社2',
      key: '下払会社2'
    },
    {
      title: '下払会社3',
      dataIndex: '下払会社3',
      key: '下払会社3'
    },
    {
      title: '下払会社4',
      dataIndex: '下払会社4',
      key: '下払会社4'
    },
    {
      title: '下払会社5',
      dataIndex: '下払会社5',
      key: '下払会社5'
    },
    {
      title: '下払会社6',
      dataIndex: '下払会社6',
      key: '下払会社6'
    },
    {
      title: '保管場所',
      dataIndex: '保管場所',
      key: '保管場所'
    },
    {
      title: '請求書作成日',
      dataIndex: '請求書作成日',
      key: '請求書作成日'
    }
  ];

  return (
    <div className='flex flex-col items-center w-full'>
      <Form layout='vertical'>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Form.Item label={"年月"} className='grow'>
            <DatePicker />
          </Form.Item>
          <Form.Item label={"請求状況"} className='grow'>
            <Select defaultValue={1} style={{ width: 100 }} />
          </Form.Item>
          <Button type='primary' className='grow'>一覧作成</Button>
        </div>
      </Form>
      <Table columns={columns} scroll={{x: 'max-content'}} className='w-full'/>
    </div>
  )
}

export default ContainerPage
