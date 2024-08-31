import React, { useContext } from 'react';
import { DatePicker, Table } from 'antd';
import { Line, Column } from '@ant-design/plots';
import { ThemeContext } from 'src/components/Theme';

const MonthlyPartnerCompanyDBGraphPage = () => {
  const { theme } = useContext(ThemeContext);
  
  const dataSource = [
    { key: '1', name: 'ユウキトランスK', '2022/10': 30000, '2023/10': 50000, '2022/11': null, '2023/11': null },
    { key: '2', name: '南本牧日新K', '2022/10': 45000, '2023/10': 50000, '2022/11': null, '2023/11': null },
    { key: '3', name: '有限会社鴫原商事K', '2022/10': 0, '2023/10': 30000, '2022/11': null, '2023/11': null },
    { key: '4', name: '東洋埠頭株式会社K', '2022/10': 100000, '2023/10': 110000, '2022/11': null, '2023/11': null },
    { key: '5', name: '鈴与カーゴネット株式会社K', '2022/10': 100000, '2023/10': 120000, '2022/11': null, '2023/11': null }
  ];

  const columns = [
    { title: '協力会社名', dataIndex: 'name', key: 'name' },
    { title: '2022/10', dataIndex: '2022/10', key: '2022/10' },
    { title: '2023/10', dataIndex: '2023/10', key: '2023/10' },
    { title: '2022/11', dataIndex: '2022/11', key: '2022/11' },
    { title: '2023/11', dataIndex: '2023/11', key: '2023/11' },
  ];

  const lineData = [];
  dataSource.map((item, index) => {
    let temp = {x: item.name, y: item['2022/10'], category: '2022/10'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2022/11'], category: '2022/11'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2023/10'], category: '2023/10'};
    lineData.push(temp);
    temp = {x: item.name, y: item['2023/11'], category: '2023/11'};
    lineData.push(temp);
  });

  const totals = dataSource.reduce((acc, item) => {
    acc['2022/10'] += item['2022/10'];
    acc['2023/10'] += item['2023/10'];
    acc['2022/11'] += item['2022/11'];
    acc['2023/11'] += item['2023/11'];
    return acc;
  }, { '2022/10': 0, '2023/10': 0, '2022/11': 0, '2023/11': 0 });

  dataSource.push({key: '6', name: '合計', '2022/10': totals['2022/10'], "2023/10": totals['2023/10'], "2022/11": totals['2022/11'], "2023/11": totals['2023/11']});

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
  const len = dataSource.length - 1;
  const barData = [
    {type: `2022/10\r\n${dataSource[len]['2022/10']}`, value: dataSource[len]['2022/10']},
    {type: `2023/10\r\n${dataSource[len]['2023/10']}`, value: dataSource[len]['2023/10']},
    {type: `2022/11\r\n${dataSource[len]['2022/11']}`, value: dataSource[len]['2022/11']},
    {type: `2023/11\r\n${dataSource[len]['2023/11']}`, value: dataSource[len]['2023/11']}
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
        <DatePicker picker="month" className='grow max-w-96' />
      </div>
      <div className="mb-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered scroll={{x: 'max-content'}} />
      </div>
      <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
        <div className='flex-1 min-w-[250px] text-center'>
          <h2>月次比較</h2>
          <Line {...config} />
        </div>
        <div className='flex-1 min-w-[250px] text-center'>
          <h2>月次合計</h2>
          <Column {...barConfig} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyPartnerCompanyDBGraphPage;
