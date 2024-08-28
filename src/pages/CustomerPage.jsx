import { DatePicker, Table, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const { Title } = Typography;

const CustomerPage = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [datas, setDatas] = useState([]);

  const columns = [
    {
      key: '顧客名称',
      title: '顧客名称',
      dataIndex: 'Name'
    },
    {
      key: 'カウント',
      title: 'カウント',
      dataIndex: 'Account'
    },
    {
      key: '担当',
      title: '担当',
      dataIndex: 'Contact'
    },
    {
      key: 'TEL',
      title: 'TEL',
      dataIndex: 'TEL'
    },
    {
      key: 'FAX',
      title: 'FAX',
      dataIndex: 'FAX'
    },
    {
      key: '住所',
      title: '住所',
      dataIndex: 'Address'
    }
  ];

  return (
    <div className='flex flex-col gap-0'>
      <Table dataSource={datas} columns={columns} scroll={{ x: 'max-content' }} className='w-full' />
    </div>
  )
}

export default CustomerPage
