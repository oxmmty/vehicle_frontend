import React, { useContext } from 'react';
import { DatePicker, Table } from 'antd';
import { Line, Column, Bar } from '@ant-design/plots';
import { ThemeContext } from 'src/components/Theme';

const MonthlyCustomerDBPage = () => {
  const { RangePicker } = DatePicker;
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
    { title: '協力会社名', dataIndex: 'name', key: 'name' },
    { title: '2022/09', dataIndex: '2022/09', key: '2022/09' },
    { title: '2023/09', dataIndex: '2023/09', key: '2023/09' },
    { title: '2022/10', dataIndex: '2022/10', key: '2022/10' },
    { title: '2023/10', dataIndex: '2023/10', key: '2023/10' },
  ];

  const lineData = [];
  dataSource.map((item, index) => {
    let temp = {x: item.name, y: item['2022/09'], category: '2022/09'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2022/10'], category: '2022/10'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2023/09'], category: '2023/09'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2023/10'], category: '2023/10'};
    lineData.push(temp);
  });

  const totals = dataSource.reduce((acc, item) => {
    acc['2022/09'] += item['2022/09'];
    acc['2023/09'] += item['2023/09'];
    acc['2022/10'] += item['2022/10'];
    acc['2023/10'] += item['2023/10'];
    return acc;
  }, { '2022/09': 0, '2023/09': 0, '2022/10': 0, '2023/10': 0 });

  dataSource.push({key: '7', name: '合計', '2022/09': totals['2022/09'], "2023/09": totals['2023/09'], "2022/10": totals['2022/10'], "2023/10": totals['2023/10']});

  const config = {
    theme: theme === 'light' ? 'academy' : 'classicDark',
    data: lineData,
    xField: 'x',
    yField: 'y',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    colorField: 'category',
    style: {
      lineWidth: 2,
    },
  };

  const barData = [
    {type: `2022/09\r\n${dataSource[6]['2022/09']}`, value: dataSource[6]['2022/09']},
    {type: `2023/09\r\n${dataSource[6]['2023/09']}`, value: dataSource[6]['2023/09']},
    {type: `2022/10\r\n${dataSource[6]['2022/10']}`, value: dataSource[6]['2022/10']},
    {type: `2023/10\r\n${dataSource[6]['2023/10']}`, value: dataSource[6]['2023/10']}
  ]
  const barConfig = {
    theme: theme === 'light' ? 'academy' : 'classicDark',
    data: barData,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type }) => {
        if (type === '10-30分' || type === '30+分') {
          return '#22CBCC';
        }
        return '#2989FF';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">協力会社別月次グラフ</h1>
      <div className="flex justify-end w-full pb-2">
        <DatePicker className='grow max-w-96' />
      </div>
      <div className="mb-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered scroll={{x: 'max-content'}} />
      </div>
      <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
        <div className='flex-1 min-w-[250px] text-center'>
          <h2>行ラベル</h2>
          <Bar {...barConfig} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyCustomerDBPage;
