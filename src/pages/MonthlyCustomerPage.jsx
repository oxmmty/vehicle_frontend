import React from 'react';
import { Table } from 'antd';
import { Line } from '@ant-design/plots';

const MonthlyCustomerPage = () => {
  const dataSource = [
    { key: '1', name: 'ユウキトランス', '2022/09': 30000, '2023/09': 50000, '2022/10': 40000, '2023/10': 60000 },
    { key: '2', name: '南本牧日新', '2022/09': 45000, '2023/09': 50000, '2022/10': 45000, '2023/10': 60000 },
    { key: '3', name: '有限会社鴨原商事', '2022/09': 0, '2023/09': 30000, '2022/10': 30000, '2023/10': 40000 },
    { key: '4', name: '東洋境運株式会社', '2022/09': 100000, '2023/09': 110000, '2022/10': 100000, '2023/10': 120000 },
    { key: '5', name: '鈴与カーゴネット株式会社', '2022/09': 100000, '2023/09': 120000, '2022/10': 100000, '2023/10': 120000 },
    { key: '6', name: '鈴与株式会社', '2022/09': 10000, '2023/09': 20000, '2022/10': 10000, '2023/10': 20000 },
  ];

  const columns = [
    { title: '顧客名', dataIndex: 'name', key: 'name' },
    { title: '2022/09', dataIndex: '2022/09', key: '2022/09' },
    { title: '2023/09', dataIndex: '2023/09', key: '2023/09' },
    { title: '2022/10', dataIndex: '2022/10', key: '2022/10' },
    { title: '2023/10', dataIndex: '2023/10', key: '2023/10' },
  ];

  const lineChartData = {
    labels: ['2022/09', '2023/09', '2022/10', '2023/10'],
    datasets: dataSource.map((data) => ({
      label: data.name,
      data: [data['2022/09'], data['2023/09'], data['2022/10'], data['2023/10']],
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      fill: false,
    })),
  };

  const barChartData = {
    labels: ['2022/09', '2023/09', '2022/10', '2023/10'],
    datasets: [
      {
        label: '合計',
        data: [
          dataSource.reduce((acc, curr) => acc + curr['2022/09'], 0),
          dataSource.reduce((acc, curr) => acc + curr['2023/09'], 0),
          dataSource.reduce((acc, curr) => acc + curr['2022/10'], 0),
          dataSource.reduce((acc, curr) => acc + curr['2023/10'], 0),
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">顧客別月次グラフ</h1>
      <div className="mb-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-center font-bold mb-2">月次比較</h2>
          <Line data={lineChartData} />
        </div>
        <div>
          <h2 className="text-center font-bold mb-2">月次合計</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyCustomerPage;
