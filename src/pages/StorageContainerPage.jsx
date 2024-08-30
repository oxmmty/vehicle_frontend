import React, { useContext } from 'react';
import { DatePicker, Table } from 'antd';
import { Line, Column } from '@ant-design/plots';
import { ThemeContext } from 'src/components/Theme';

const StorageContainerPage = () => {
  const { theme } = useContext(ThemeContext);
  const dataSource = [
    { key: '1', name: 'ユウキトランス', '2022/09': 30000, '2023/09': 50000, '2022/10': 40000, '2023/10': 60000 },
    { key: '2', name: '南本牧日新', '2022/09': 45000, '2023/09': 50000, '2022/10': 45000, '2023/10': 60000 },
    { key: '3', name: '有限会社鴨原商事', '2022/09': 0, '2023/09': 30000, '2022/10': 30000, '2023/10': 40000 },
    { key: '4', name: '東洋境運株式会社', '2022/09': 100000, '2023/09': 110000, '2022/10': 100000, '2023/10': 120000 },
    { key: '5', name: '鈴与カーゴネット株式会社', '2022/09': 100000, '2023/09': 120000, '2022/10': 100000, '2023/10': 120000 },
    { key: '6', name: '鈴与株式会社', '2022/09': 10000, '2023/09': 20000, '2022/10': 10000, '2023/10': 20000 },
  ];

  const columns = [
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
      key: 'コンテナサイズ',
      title: 'コンテナサイズ',
      dataIndex: 'コンテナサイズ'
    },
    {
      key: 'コンテナタイプ',
      title: 'コンテナタイプ',
      dataIndex: 'コンテナタイプ'
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

  return (
    <div className="container mx-auto p-4">
      <Table columns={columns} pagination={false} bordered scroll={{x: 'max-content'}} />
    </div>
  );
};

export default StorageContainerPage;
