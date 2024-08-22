import { Typography } from 'antd';
import React from 'react';
import Pretend from 'src/components/Pretend';

const {Title, Text} = Typography;

const DailyPage = () => {
  const data = {
    order: 'MA240618-0001',
    category: '実入り取り',
    request: '2024/6/19',
    removal: '青海A-4',
    axles: '',
    container: 'C12345',
    type1: '',
    size: '40',
    type2: '',
    goods: 'いいえ',
    destination1: '株式会社アルプス物流',
    loading1: '2024/1/2',
    date1: '2024/1/3',
    time1: '1:00:00',
    address1: '神奈川県横浜市港北区新羽町1756　2号棟',
    telephone1: '',
    charge1: '',
    basic: '',
    axle3: '',
    destination2: '',
    loading2: '',
    date2: '',
    time2: '',
    address2: '',
    telephone2: '',
    charge2: '',
    destination3: '',
    loading3: '',
    date3: '',
    time3: '',
    address3: '',
    telephone3: '',
    charge3: '',
    place: '',
    vessel: '',
    voy: '',
    company: '',
    bk: '',
    bl: '',
    discharge: '',
    final: '',
    consignor: '',
    scale: '',
    chassis: '',
    highway: '',
    other: '',
    fee: '',
    remarks: '',
  }

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <Typography>
        <Title level={2}>仮依頼書</Title>
      </Typography>
      <div className="flex justify-between w-full">
        <Text strong>寿咲 御中</Text>
        <div className='flex flex-col'>
          <Text>翔風運輸株式会社</Text>
          <Text type='secondary'>担当：渡邉</Text>
        </div>
      </div>
      <Pretend data={data} className='w-full' />
    </div>
  );
};

export default DailyPage;
