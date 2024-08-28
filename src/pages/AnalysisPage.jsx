import { DatePicker, Table, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const { Title } = Typography;

const AnalysisPage = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [datas, setDatas] = useState([]);
  
  const columns = [
    {
      title: '協力会社名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '前日',
      dataIndex: 'yesterday',
      key: 'yesterday',
    },
    {
      title: '当日→',
      dataIndex: 'today',
      key: 'today',
    }
  ];

  const onChange = (_, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    const run = async () => {
      const res = await axios.get('/partnercompnay');
      const tdata = [];
      res.data.map((item, index) => {
        tdata.push({
          key: index,
          name: item['配車名称'],
          yesterday: '',
          today: ''
        })
      });
      setDatas(tdata)
    }
    run();
  }, [])
  return (
    <div className='flex flex-col gap-0'>
      <DatePicker onChange={onChange} defaultValue={dayjs(date, 'YYYY-MM-DD')} className='grow max-w-96'/>
      <Typography className='flex justify-center'>
        <Title level={3}>{date}</Title>
      </Typography>
      <Table dataSource={datas} columns={columns} scroll={{x: 'max-content'}} className='w-full'  />
    </div>
  )
}

export default AnalysisPage
