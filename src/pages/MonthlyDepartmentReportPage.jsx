import React from 'react';
import { Divider, Table, Typography } from 'antd';
import PercentChart from 'src/components/PercentChart';

const { Title, Text } = Typography;
const columns = [
  {
    title: '項目 \\ 拠点',
    dataIndex: 'project',
    key: 'project',
    colSpan: 2,
    onCell: (_, index) => {
      if (index === 0 || index === 5 || index === 9 || index === 13 || index === 24 || index === 28 || index === 29 || index === 30) {
        return { colSpan: 2 };
      }
      if (index === 1 || index === 31) {
        return { rowSpan: 4 };
      }
      if (index === 6 || index === 10 || index === 35) {
        return { rowSpan: 3 };
      }
      if (index === 14) {
        return { rowSpan: 10 };
      }
      if ((index > 1 && index < 5) || (index > 6 && index < 9) || (index > 10 && index < 13) || (index > 14 && index < 24) || (index > 31 && index < 35) || (index > 35 && index < 38)) {
        return { rowSpan: 0 };
      }
    }
  },
  {
    title: '第45期計',
    dataIndex: 'name',
    key: 'name',
    colSpan: 0,
    onCell: (_, index) => ({
      colSpan: index === 0 || index === 5 || index === 9 || index === 13 || index === 24 || index === 28 || index === 29 || index === 30 ? 0 : 1,
    })
  },
  {
    title: '月別内訳',
    children: [
      {
        title: '21/7',
        dataIndex: '7',
        key: '7',
      },
      {
        title: '8',
        dataIndex: '8',
        key: '8',
      },
      {
        title: '9',
        dataIndex: '9',
        key: '9',
      },
      {
        title: '10',
        dataIndex: '10',
        key: '10',
      },
      {
        title: '11',
        dataIndex: '11',
        key: '11',
      },
      {
        title: '12',
        dataIndex: '12',
        key: '12',
      },
      {
        title: '22/1',
        dataIndex: '1',
        key: '1',
      },
      {
        title: '2',
        dataIndex: '2',
        key: '2',
      },
      {
        title: '3',
        dataIndex: '3',
        key: '3',
      },
      {
        title: '4',
        dataIndex: '4',
        key: '4',
      },
      {
        title: '5',
        dataIndex: '5',
        key: '5',
      },
      {
        title: '6',
        dataIndex: '6',
        key: '6',
      }
    ]
  },
  {
    title: '第45期計',
    dataIndex: 'sum',
    key: 'sum'
  },
  {
    title: '担当',
    dataIndex: 'response',
    key: 'response'
  },
  {
    title: '備考他',
    dataIndex: 'other',
    key: 'other',
    onCell: (_, index) => {
      if (index === 6) {
        return { rowSpan: 4 };
      }
      if (index > 6 && index < 10) {
        return { rowSpan: 0 };
      }
    }
  },
];

const data = [];
const initialTable = () => {
  data.push({
    project: <div>
      <Text>売上高に占める</Text>
      <PercentChart show={false} data={{ benefit: 10, expenses: 30, depreciation: 30, fee: 30 }} />
    </div>,
    other: <div>
      <li>労務費には厚生費を含む</li>
      <li>償却費には地代家賃含む</li>
      <li>経費には運行費/修理費/材料費を含む</li>
    </div>,
    '7': <PercentChart data={{ benefit: 10, expenses: 30, depreciation: 30, fee: 30 }} />
  })
  data.push({ project: '売上', name: 'トラック', response: '各営業所' })
  data.push({ name: 'コンテナ', response: '各営業所' })
  data.push({ name: '傭車売上', response: '各営業所' })
  data.push({ name: '売上げ高合計' })
  data.push({ project: '①材料費' })
  data.push({
    name: '車輌償却費', response: '各営業所', other: <div>
      <li>`20/9時点､運輸Sys『ﾏｽﾀｰ』→『車両台帳』→『稼働』ﾍﾞｰｽの各拠点別保有車両台帳作成</li>
      <li>上記をﾍﾞｰｽに車両別に償却費/保険費/諸税を　算定計上</li>
    </div>
  })
  data.push({ name: '保険費(自賠責/任意)', response: '各営業所' })
  data.push({ name: '諸税(自動車税/重量税)', response: '各営業所' })
  data.push({ project: '②車輌固定費' })
  data.push({ name: '労務費', response: '総務' })
  data.push({ name: '残業', response: '総務' })
  data.push({ name: '厚生費', response: '総務' })
  data.push({ project: '③労務費計', other: '支給ﾍﾞｰｽ' })
  data.push({ name: '車・点検費', response: '各営業所' })
  data.push({ name: '修理費', response: '各営業所', other: '車両実績一覧『修理費』＋東京日野支払分' })
  data.push({ name: '有料費', response: '総務', other: '実績金額×ﾄﾗ/ｺﾝ道路ｶｰﾄﾞ比率' })
  data.push({ name: '燃料費', response: '総務', other: '車両実績一覧『燃料補給量』×実績＠' })
  data.push({ name: '尿素費' })
  data.push({ name: 'ﾘﾌﾄﾚﾝﾀﾙ費', response: '各営業所' })
  data.push({ name: '傭車費', response: '各営業所', other: '運輸Sys青トラ『傭車先支払明細書』より' })
  data.push({ name: '外注費', response: '各営業所' })
  data.push({ name: '地代家賃/賃借費', response: '総務' })
  data.push({ name: '償却費', response: '総務' })
  data.push({ project: '④経費 計' })
  data.push({ name: '労務費(含む厚生費)', response: '総務' })
  data.push({ name: '公用車', response: '各営業所' })
  data.push({ name: '水道光熱費他', response: '総務' })
  data.push({ project: '⑤一般管理費' })
  data.push({ project: '①～➄運送原価' })
  data.push({ project: <div>粗利<br />除く償却完</div> })
  data.push({ project: '人員', name: 'ドライバー', response: '各営業所' })
  data.push({ project: '人員', name: '作業者', response: '各営業所' })
  data.push({ project: '人員', name: '一般管理', response: '各営業所' })
  data.push({ project: '人員', name: '計' })
  data.push({ project: '車両', name: 'E/G付き', response: '各営業所' })
  data.push({ project: '車両', name: '被牽引車両', response: '各営業所' })
  data.push({ project: '車両', name: 'フォークリフト', response: '各営業所' })
}
initialTable();

const MonthlyDepartmentReportPage = () => (
  <div className='flex flex-col justify-center items-center w-full'>
    <Typography>
      <Title level={3}>第45期(`21/7～`22/6) 拠点別/月別収益状況 (区分 トラック/山梨)</Title>
      <Divider className='mt-0 pt-0' />
    </Typography>
    <Table className='w-full'
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
      size="middle"
      scroll={{
        x: 'max-content',
      }}
    />
  </div>
);
export default MonthlyDepartmentReportPage;