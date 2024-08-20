import React from 'react';
import { Table } from 'antd';

const MailPage = () => {
  const fileColumns = [
    {
      title: 'ファイル名',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '協力会社',
      dataIndex: 'cooperationCompany',
      key: 'cooperationCompany',
    },
    {
      title: '配達先',
      dataIndex: 'deliveryDestination',
      key: 'deliveryDestination',
    },
    {
      title: '配達日',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: '配信日',
      dataIndex: 'transmissionDate',
      key: 'transmissionDate',
    },
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

  const emailContent = [
    {
      key: '1',
      header: '文頭',
      content: 'いつもお世話になっております。',
    },
    {
      key: '2',
      header: '本文',
      content: '輸送リストと輸送依頼書をお送りいたします。',
    },
    {
      key: '3',
      header: '文末',
      content: 'よろしくお願いいたします。',
    },
  ];

  return (
    <div className="p-4">
      <Table 
        columns={fileColumns} 
        dataSource={fileData} 
        pagination={false} 
        bordered 
        scroll={{x: 'max-content'}}
      />

      <div className="mt-4 border rounded-lg p-4">
        <table className="min-w-full border border-collapse">
          <tbody>
            {emailContent.map((item) => (
              <tr key={item.key}>
                <td className="border px-4 py-2 bg-gray-100 font-semibold">{item.header}</td>
                <td className="border px-4 py-2">{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailPage;
