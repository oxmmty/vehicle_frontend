import { Button, Table, Typography } from 'antd';
import { useState } from 'react'
import Waybill from 'src/components/Waybill';

const { Title, Text } = Typography;

const TruckPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  const data = {
    date: '2023/1/3',
    shipper: '',
    time: '1:00:00 AM',
    address: '神奈川県横浜市港北区新羽町1756　2号棟',
    vessel: '',
    item: '',
    weight: 'kg',
    quantity: '個 ・ ',
    number: 'C12345',
    notes: 'デバック設定OK'
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-end w-full'>
        <Text>受注コード: NA231203-0002</Text>
      </div>
      <Typography>
        <Title level={2}>送り状</Title>
      </Typography>
      <div className="flex flex-wrap flex-row items-end justify-center gap-4 w-full">
        <Waybill data={data} className='grow' />
        <div className="flex flex-col gap-4 flex-1">
          <Button type='primary' className='w-52 h-32 mx-auto'>自社情報</Button>
          <Table className='grow' dataSource={[{ mark: <div className='h-28'></div> }]} pagination={false} columns={[{
            key: 0,
            title: '受領印',
            dataIndex: 'mark'
          }]} />
        </div>
      </div>
      
      <div className='flex justify-end w-full pt-5'>
        <Text>受注コード: NA231203-0002</Text>
      </div>
      <Typography>
        <Title level={2}>送り状</Title>
      </Typography>
      <div className="flex flex-wrap flex-row items-end justify-center gap-4 w-full">
        <Waybill data={data} className='grow' />
        <div className="flex flex-col gap-4 flex-1">
          <Button type='primary' className='w-52 h-32 mx-auto'>自社情報</Button>
          <Table className='grow' dataSource={[{ mark: <div className='h-28'></div> }]} pagination={false} columns={[{
            key: 0,
            title: '受領印',
            dataIndex: 'mark'
          }]} />
        </div>
      </div>
    </div>
  )
}

export default TruckPage
