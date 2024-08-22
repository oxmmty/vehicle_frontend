import React from 'react';
import { Button, Table } from 'antd';
import Mail from 'src/components/Mail';

const InventoryPage = () => {
  const fileColumns = [
    {
      key: '搬入日',
      title: '搬入日',
      dataIndex: '搬入日'
    },
    {
      key: '搬出日',
      title: '搬出日',
      dataIndex: '搬出日'
    },
    {
      key: 'コンテナ№',
      title: 'コンテナ№',
      dataIndex: 'コンテナ№'
    },
    {
      key: 'サイズ',
      title: 'サイズ',
      dataIndex: 'サイズ'
    },
    {
      key: 'タイプ',
      title: 'タイプ',
      dataIndex: 'タイプ'
    },
    {
      key: '船社',
      title: '船社',
      dataIndex: '船社'
    },
    {
      key: '保管先',
      title: '保管先',
      dataIndex: '保管先'
    },
    {
      key: '搬入顧客',
      title: '搬入顧客',
      dataIndex: '搬入顧客'
    },
    {
      key: '搬出顧客',
      title: '搬出顧客',
      dataIndex: '搬出顧客'
    },
    {
      key: '搬出ブッキング№',
      title: '搬出ブッキング№',
      dataIndex: '搬出ブッキング№'
    }
  ];

  const fileData = [
    {
      key: '1',
      fileName: 'エムズ物流株式会社2401030100 株式会社アルプス物流 HA240419-0001.pdf',
      cooperationCompany: 'エムズ物流株式会社',
      deliveryDestination: '株式会社アルプス物流',
      deliveryDate: '1/3',
      transmissionDate: '4/25',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Button className='float-end'>更新</Button>
      </div>
      <Table
        columns={fileColumns}
        dataSource={fileData}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default InventoryPage;
