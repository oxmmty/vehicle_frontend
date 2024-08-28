import { DatePicker, Table, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const { Title } = Typography;

const DBPage = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [datas, setDatas] = useState([]);

  const columns = [
    {
      key: 'ID',
      title: 'ID',
      dataIndex: 'ID'
    },
    {
      key: '識別コード',
      title: '識別コード',
      dataIndex: '識別コード'
    },
    {
      key: '配車組み',
      title: '配車組み',
      dataIndex: '配車組み'
    },
    {
      key: '部署コード',
      title: '部署コード',
      dataIndex: '部署コード'
    },
    {
      key: 'ピックチェック',
      title: 'ピックチェック',
      dataIndex: 'ピックチェック'
    },
    {
      key: '区分',
      title: '区分',
      dataIndex: '区分'
    },
    {
      key: '未定',
      title: '未定',
      dataIndex: '未定'
    },
    {
      key: '荷主名',
      title: '荷主名',
      dataIndex: '荷主名'
    },
    {
      key: '顧客名',
      title: '顧客名',
      dataIndex: '顧客名'
    },
    {
      key: '配送日',
      title: '配送日',
      dataIndex: '配送日'
    },
    {
      key: '配送時間',
      title: '配送時間',
      dataIndex: '配送時間'
    },
    {
      key: '倉庫作業日',
      title: '倉庫作業日',
      dataIndex: '倉庫作業日'
    },
    {
      key: '倉庫作業時間',
      title: '倉庫作業時間',
      dataIndex: '倉庫作業時間'
    },
    {
      key: '自社車番',
      title: '自社車番',
      dataIndex: '自社車番'
    },
    {
      key: '自社シャーシ',
      title: '自社シャーシ',
      dataIndex: '自社シャーシ'
    },
    {
      key: '自社乗務員',
      title: '自社乗務員',
      dataIndex: '自社乗務員'
    },
    {
      key: '協力会社名',
      title: '協力会社名',
      dataIndex: '協力会社名'
    },
    {
      key: '輸送料金',
      title: '輸送料金',
      dataIndex: '輸送料金'
    },
    {
      key: '輸送課税',
      title: '輸送課税',
      dataIndex: '輸送課税'
    },
    {
      key: '下払会社名1',
      title: '下払会社名1',
      dataIndex: '下払会社名1'
    },
    {
      key: '下払料金1',
      title: '下払料金1',
      dataIndex: '下払料金1'
    },
    {
      key: '下払課税1',
      title: '下払課税1',
      dataIndex: '下払課税1'
    },
    {
      key: '下払自車1',
      title: '下払自車1',
      dataIndex: '下払自車1'
    },
    {
      key: '下払会社名2',
      title: '下払会社名2',
      dataIndex: '下払会社名2'
    },
    {
      key: '下払料金2',
      title: '下払料金2',
      dataIndex: '下払料金2'
    },
    {
      key: '下払課税2',
      title: '下払課税2',
      dataIndex: '下払課税2'
    },
    {
      key: '下払自車2',
      title: '下払自車2',
      dataIndex: '下払自車2'
    },
    {
      key: '下払会社名3',
      title: '下払会社名3',
      dataIndex: '下払会社名3'
    },
    {
      key: '下払料金3',
      title: '下払料金3',
      dataIndex: '下払料金3'
    },
    {
      key: '下払課税3',
      title: '下払課税3',
      dataIndex: '下払課税3'
    },
    {
      key: '下払自車3',
      title: '下払自車3',
      dataIndex: '下払自車3'
    },
    {
      key: '下払会社名4',
      title: '下払会社名4',
      dataIndex: '下払会社名4'
    },
    {
      key: '下払料金4',
      title: '下払料金4',
      dataIndex: '下払料金4'
    },
    {
      key: '下払課税4',
      title: '下払課税4',
      dataIndex: '下払課税4'
    },
    {
      key: '下払自車4',
      title: '下払自車4',
      dataIndex: '下払自車4'
    },
    {
      key: '下払会社名5',
      title: '下払会社名5',
      dataIndex: '下払会社名5'
    },
    {
      key: '下払料金5',
      title: '下払料金5',
      dataIndex: '下払料金5'
    },
    {
      key: '下払課税5',
      title: '下払課税5',
      dataIndex: '下払課税5'
    },
    {
      key: '下払自車5',
      title: '下払自車5',
      dataIndex: '下払自車5'
    },
    {
      key: '下払会社名6',
      title: '下払会社名6',
      dataIndex: '下払会社名6'
    },
    {
      key: '下払料金6',
      title: '下払料金6',
      dataIndex: '下払料金6'
    },
    {
      key: '下払課税6',
      title: '下払課税6',
      dataIndex: '下払課税6'
    },
    {
      key: '下払自車6',
      title: '下払自車6',
      dataIndex: '下払自車6'
    },
    {
      key: 'その他料金',
      title: 'その他料金',
      dataIndex: 'その他料金'
    },
    {
      key: 'その他課税',
      title: 'その他課税',
      dataIndex: 'その他課税'
    },
    {
      key: '高速代',
      title: '高速代',
      dataIndex: '高速代'
    },
    {
      key: '入庫日',
      title: '入庫日',
      dataIndex: '入庫日'
    },
    {
      key: '出庫日',
      title: '出庫日',
      dataIndex: '出庫日'
    },
    {
      key: '荷主保管料金リフトオフ',
      title: '荷主保管料金リフトオフ',
      dataIndex: '荷主保管料金リフトオフ'
    },
    {
      key: '荷主保管料金リフトオン',
      title: '荷主保管料金リフトオン',
      dataIndex: '荷主保管料金リフトオン'
    },
    {
      key: '荷主保管課税',
      title: '荷主保管課税',
      dataIndex: '荷主保管課税'
    },
    {
      key: '下払保管料金リフトオフ',
      title: '下払保管料金リフトオフ',
      dataIndex: '下払保管料金リフトオフ'
    },
    {
      key: '下払保管料金リフトオン',
      title: '下払保管料金リフトオン',
      dataIndex: '下払保管料金リフトオン'
    },
    {
      key: '下払保管課税',
      title: '下払保管課税',
      dataIndex: '下払保管課税'
    },
    {
      key: '送り状受領書作成有',
      title: '送り状受領書作成有',
      dataIndex: '送り状受領書作成有'
    },
    {
      key: '請求備考欄',
      title: '請求備考欄',
      dataIndex: '請求備考欄'
    },
    {
      key: '配車日',
      title: '配車日',
      dataIndex: '配車日'
    },
    {
      key: '仮依頼書',
      title: '仮依頼書',
      dataIndex: '仮依頼書'
    },
    {
      key: '依頼書',
      title: '依頼書',
      dataIndex: '依頼書'
    },
    {
      key: 'mail',
      title: 'mail',
      dataIndex: 'mail'
    },
    {
      key: '搬出ブッキング№',
      title: '搬出ブッキング№',
      dataIndex: '搬出ブッキング№'
    },
    {
      key: '保管先',
      title: '保管先',
      dataIndex: '保管先'
    },
    {
      key: '受注金額',
      title: '受注金額',
      dataIndex: '受注金額'
    }
  ];

  return (
    <div className='flex flex-col gap-0'>
      <Table dataSource={datas} columns={columns} scroll={{ x: 'max-content' }} className='w-full' />
    </div>
  )
}

export default DBPage
