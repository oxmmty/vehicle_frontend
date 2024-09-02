import React, { useContext } from 'react';
import { DatePicker, Table } from 'antd';
import { Column } from '@ant-design/plots';
import { ThemeContext } from 'src/components/Theme';

const MonthlyCustomerDBPage = () => {
  const { RangePicker } = DatePicker;
  const { theme } = useContext(ThemeContext);
  const dataSource = [
    { key: '1', name: 'ユウキトランス', '2022/09': 30000, '2023/09': 50000, '2022/10': 40000, '2023/10': 60000 },
    { key: '2', name: '西日本鉄道株式会社', '2022/09': 45000, '2023/09': 50000, '2022/10': 45000, '2023/10': 60000 },
    { key: '3', name: '東洋埠頭株式会社', '2022/09': 0, '2023/09': 30000, '2022/10': 30000, '2023/10': 40000 },
    { key: '4', name: '南本牧日新', '2022/09': 100000, '2023/09': 110000, '2022/10': 100000, '2023/10': 120000 },
    { key: '5', name: '有限会社鴫原商事', '2022/09': 100000, '2023/09': 120000, '2022/10': 100000, '2023/10': 120000 },
    { key: '6', name: '鈴与カーゴネット株式会社', '2022/09': 10000, '2023/09': 20000, '2022/10': 10000, '2023/10': 20000 },
    { key: '7', name: '鈴与株式会社', '2022/09': 10000, '2023/09': 20000, '2022/10': 10000, '2023/10': 20000 },
  ];

  const columns = [
    { title: '合計/受注金額', dataIndex: 'name', key: 'name' },
    { title: '2022/09', dataIndex: '2022/09', key: '2022/09' },
    { title: '2023/09', dataIndex: '2023/09', key: '2023/09' },
    { title: '2022/10', dataIndex: '2022/10', key: '2022/10' },
    { title: '2023/10', dataIndex: '2023/10', key: '2023/10' },
  ];

  const transformData = (dataSource) => {
    const newData = [];

    dataSource.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'key' && key !== 'name') {
          newData.push({
            month: key,
            x: item['name'],
            y: item[key],
          });
        }
      });
    });
    return newData;
  }

  const barData = transformData(dataSource);
  
  const totals = dataSource.reduce((acc, item) => {
    acc['2022/09'] += item['2022/09'];
    acc['2023/09'] += item['2023/09'];
    acc['2022/10'] += item['2022/10'];
    acc['2023/10'] += item['2023/10'];
    return acc;
  }, { '2022/09': 0, '2023/09': 0, '2022/10': 0, '2023/10': 0 });

  dataSource.push({ key: '8', name: '総計', '2022/09': totals['2022/09'], "2023/09": totals['2023/09'], "2022/10": totals['2022/10'], "2023/10": totals['2023/10'] });

  const config = {
    theme: theme === 'light' ? 'academy' : 'classicDark',
    data: barData,
    xField: 'x',
    yField: 'y',
    colorField: 'month',
    group: true
  };
  
  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">協力会社別月次グラフ</h1>
      <div className="flex justify-end w-full pb-2">
        <RangePicker picker='month' className='grow max-w-96' />
      </div>
      <div className="mb-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered scroll={{ x: 'max-content' }} />
      </div>
      <div className="flex flex-col items-center justify-center w-full pt-5">
        <h2>行ラベル</h2>
        <Column {...config} className={"w-full"}/>
      </div>
    </div>
  );
};

export default MonthlyCustomerDBPage;
