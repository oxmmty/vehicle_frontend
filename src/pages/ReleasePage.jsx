import React from 'react';
import { Button, Table } from 'antd';
import Mail from 'src/components/Mail';

const ReleasePage = () => {
  const fileColumns = [
    {
      key: 'no',
      title: '＃',
      dataIndex: 'no'
    },
    {
      key: '変更理由',
      title: '変更理由',
      dataIndex: '変更理由'
    },
    {
      key: '項目',
      title: '項目',
      dataIndex: '項目'
    },
    {
      key: '対象',
      title: '対象',
      dataIndex: '対象'
    },
    {
      key: '内容',
      title: '内容',
      dataIndex: '内容'
    },
    {
      key: '反映バージョン',
      title: '反映バージョン',
      dataIndex: '反映バージョン'
    },
    {
      key: '実装日時',
      title: '実装日時',
      dataIndex: '実装日時'
    },
    {
      key: '確認日時',
      title: '確認日時',
      dataIndex: '確認日時'
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

export default ReleasePage;
