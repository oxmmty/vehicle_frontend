import { Button, Table, Typography } from 'antd';
import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import axios from 'axios';

const { Title } = Typography;

const PaymentPage = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM'));
  const [datas, setDatas] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      fixed: 'left',
    },
    {
      title: '識別コード',
      dataIndex: '識別コード',
      key: '識別コード',
      fixed: 'left',
    },
    {
      title: '請求日',
      dataIndex: '請求日',
      key: '請求日',
    },
    {
      title: '配車組み',
      dataIndex: '配車組み',
      key: '配車組み',
    },
    {
      title: '部署コード',
      dataIndex: '部署コード',
      key: '部署コード',
    },
    {
      title: 'ピックチェック',
      dataIndex: 'ピックチェック',
      key: 'ピックチェック',
    },
    {
      title: '区分',
      dataIndex: '区分',
      key: '区分',
    },
    {
      title: '未定',
      dataIndex: '未定',
      key: '未定',
    },
    {
      title: '送り状受領書作成',
      dataIndex: '送り状受領書作成',
      key: '送り状受領書作成',
    },
    {
      title: '荷主名',
      dataIndex: '荷主名',
      key: '荷主名',
    },
    {
      title: '顧客名',
      dataIndex: '顧客名',
      key: '顧客名',
    },
    {
      title: '配達先1',
      dataIndex: '配達先1',
      key: '配達先1',
    },
    {
      title: '配達先2',
      dataIndex: '配達先2',
      key: '配達先2',
    },
    {
      title: '配達先3',
      dataIndex: '配達先3',
      key: '配達先3',
    },
    {
      title: '取場所',
      dataIndex: '取場所',
      key: '取場所',
    },
    {
      title: '搬入返却場所',
      dataIndex: '搬入返却場所',
      key: '搬入返却場所',
    },
    {
      title: '船社',
      dataIndex: '船社',
      key: '船社',
    },
    {
      title: 'コンテナタイプ',
      dataIndex: 'コンテナタイプ',
      key: 'コンテナタイプ',
    },
    {
      title: 'コンテナサイズ',
      dataIndex: 'コンテナサイズ',
      key: 'コンテナサイズ',
    },
    {
      title: 'コンテナ種類',
      dataIndex: 'コンテナ種類',
      key: 'コンテナ種類',
    },
    {
      title: '危険品',
      dataIndex: '危険品',
      key: '危険品',
    },
    {
      title: 'コンテナNo',
      dataIndex: 'コンテナNo',
      key: 'コンテナNo',
    },
    {
      title: '自社車番1',
      dataIndex: '自社車番1',
      key: '自社車番1',
    },
    {
      title: '自社車番2',
      dataIndex: '自社車番2',
      key: '自社車番2',
    },
    {
      title: '自社乗務員',
      dataIndex: '自社乗務員',
      key: '自社乗務員',
    },
    {
      title: '協力会社名',
      dataIndex: '協力会社名',
      key: '協力会社名',
    },
    {
      title: '下払会社名1',
      dataIndex: '下払会社名1',
      key: '下払会社名1',
    },
    {
      title: '下払料金1',
      dataIndex: '下払料金1',
      key: '下払料金1',
    },
    {
      title: '下払課税1',
      dataIndex: '下払課税1',
      key: '下払課税1',
    },
    {
      title: '下払自車1',
      dataIndex: '下払自車1',
      key: '下払自車1',
    },
    {
      title: '下払会社名2',
      dataIndex: '下払会社名2',
      key: '下払会社名2',
    },
    {
      title: '下払料金2',
      dataIndex: '下払料金2',
      key: '下払料金2',
    },
    {
      title: '下払課税2',
      dataIndex: '下払課税2',
      key: '下払課税2',
    },
    {
      title: '下払自車2',
      dataIndex: '下払自車2',
      key: '下払自車2',
    },
    {
      title: '下払会社名3',
      dataIndex: '下払会社名3',
      key: '下払会社名3',
    },
    {
      title: '下払料金3',
      dataIndex: '下払料金3',
      key: '下払料金3',
    },
    {
      title: '下払課税3',
      dataIndex: '下払課税3',
      key: '下払課税3',
    },
    {
      title: '下払自車3',
      dataIndex: '下払自車3',
      key: '下払自車3',
    },
    {
      title: '下払会社名4',
      dataIndex: '下払会社名4',
      key: '下払会社名4',
    },
    {
      title: '下払料金4',
      dataIndex: '下払料金4',
      key: '下払料金4',
    },
    {
      title: '下払課税4',
      dataIndex: '下払課税4',
      key: '下払課税4',
    },
    {
      title: '下払自車4',
      dataIndex: '下払自車4',
      key: '下払自車4',
    },
    {
      title: '下払会社名5',
      dataIndex: '下払会社名5',
      key: '下払会社名5',
    },
    {
      title: '下払料金5',
      dataIndex: '下払料金5',
      key: '下払料金5',
    },
    {
      title: '下払課税5',
      dataIndex: '下払課税5',
      key: '下払課税5',
    },
    {
      title: '下払自車5',
      dataIndex: '下払自車5',
      key: '下払自車5',
    },
    {
      title: '下払会社名6',
      dataIndex: '下払会社名6',
      key: '下払会社名6',
    },
    {
      title: '下払料金6',
      dataIndex: '下払料金6',
      key: '下払料金6',
    },
    {
      title: '下払課税6',
      dataIndex: '下払課税6',
      key: '下払課税6',
    },
    {
      title: '下払自車6',
      dataIndex: '下払自車6',
      key: '下払自車6',
    },
    {
      title: '高速費',
      dataIndex: '高速費',
      key: '高速費',
    },
    {
      title: '入庫日',
      dataIndex: '入庫日',
      key: '入庫日',
    },
    {
      title: '出庫日',
      dataIndex: '出庫日',
      key: '出庫日',
    },
    {
      title: '荷主保管料金リフトオフ',
      dataIndex: '荷主保管料金リフトオフ',
      key: '荷主保管料金リフトオフ',
    },
    {
      title: '荷主保管料金リフトオン',
      dataIndex: '荷主保管料金リフトオン',
      key: '荷主保管料金リフトオン',
    },
    {
      title: '荷主保管料金1日',
      dataIndex: '荷主保管料金1日',
      key: '荷主保管料金1日',
    },
    {
      title: '荷主保管課税',
      dataIndex: '荷主保管課税',
      key: '荷主保管課税',
    },
    {
      title: '下払保管料金リフトオフ',
      dataIndex: '下払保管料金リフトオフ',
      key: '下払保管料金リフトオフ',
    },
    {
      title: '下払保管料金リフトオン',
      dataIndex: '下払保管料金リフトオン',
      key: '下払保管料金リフトオン',
    },
    {
      title: '下払保管料金1日',
      dataIndex: '下払保管料金1日',
      key: '下払保管料金1日',
    },
    {
      title: '下払保管課税',
      dataIndex: '下払保管課税',
      key: '下払保管課税',
    },
    {
      title: '依頼書備考',
      dataIndex: '依頼書備考',
      key: '依頼書備考',
    },
    {
      title: '請求書備考',
      dataIndex: '請求書備考',
      key: '請求書備考',
    },
    {
      title: '送り状受領書備考',
      dataIndex: '送り状受領書備考',
      key: '送り状受領書備考',
    },
    {
      title: 'スケール費',
      dataIndex: 'スケール費',
      key: 'スケール費',
    },
    {
      title: 'シャーシ留置費',
      dataIndex: 'シャーシ留置費',
      key: 'シャーシ留置費',
    },
    {
      title: 'その他費用',
      dataIndex: 'その他費用',
      key: 'その他費用',
    },
    {
      title: '依頼書備考2',
      dataIndex: '依頼書備考2',
      key: '依頼書備考2',
    },
    {
      title: '依頼書備考3',
      dataIndex: '依頼書備考3',
      key: '依頼書備考3',
    },
    {
      title: '重量',
      dataIndex: '重量',
      key: '重量',
    },
    {
      title: 'その他課税',
      dataIndex: 'その他課税',
      key: 'その他課税',
    },
    {
      title: '自社車番F2',
      dataIndex: '自社車番F2',
      key: '自社車番F2',
    },
    {
      title: '自社車番S2',
      dataIndex: '自社車番S2',
      key: '自社車番S2',
    },
    {
      title: '自社乗務員2',
      dataIndex: '自社乗務員2',
      key: '自社乗務員2',
    },
    {
      title: '自社車番F3',
      dataIndex: '自社車番F3',
      key: '自社車番F3',
    },
    {
      title: '自社車番S3',
      dataIndex: '自社車番S3',
      key: '自社車番S3',
    },
    {
      title: '自社乗務員3',
      dataIndex: '自社乗務員3',
      key: '自社乗務員3',
    },
    {
      title: '自社車番F4',
      dataIndex: '自社車番F4',
      key: '自社車番F4',
    },
    {
      title: '自社車番S4',
      dataIndex: '自社車番S4',
      key: '自社車番S4',
    },
    {
      title: '自社乗務員4',
      dataIndex: '自社乗務員4',
      key: '自社乗務員4',
    },
    {
      title: '自社車番F5',
      dataIndex: '自社車番F5',
      key: '自社車番F5',
    },
    {
      title: '自社車番S5',
      dataIndex: '自社車番S5',
      key: '自社車番S5',
    },
    {
      title: '自社乗務員5',
      dataIndex: '自社乗務員5',
      key: '自社乗務員5',
    },
    {
      title: '自社車番F6',
      dataIndex: '自社車番F6',
      key: '自社車番F6',
    },
    {
      title: '自社車番S6',
      dataIndex: '自社車番S6',
      key: '自社車番S6',
    },
    {
      title: '自社乗務員6',
      dataIndex: '自社乗務員6',
      key: '自社乗務員6',
    },
    {
      title: '保管場所',
      dataIndex: '保管場所',
      key: '保管場所',
    },
    {
      title: '空バン返却',
      dataIndex: '空バン返却',
      key: '空バン返却',
    },
    {
      title: 'CRU顧客名',
      dataIndex: 'CRU顧客名',
      key: 'CRU顧客名',
    },
    {
      title: '軸数',
      dataIndex: '軸数',
      key: '軸数',
    },
    {
      title: 'スケール費課税1',
      dataIndex: 'スケール費課税1',
      key: 'スケール費課税1',
    },
    {
      title: 'シャーシ留置費課税1',
      dataIndex: 'シャーシ留置費課税1',
      key: 'シャーシ留置費課税1',
    },
    {
      title: '高速費2',
      dataIndex: '高速費2',
      key: '高速費2',
    },
    {
      title: 'スケール費2',
      dataIndex: 'スケール費2',
      key: 'スケール費2',
    },
    {
      title: 'スケール費課税2',
      dataIndex: 'スケール費課税2',
      key: 'スケール費課税2',
    },
    {
      title: 'シャーシ留置費2',
      dataIndex: 'シャーシ留置費2',
      key: 'シャーシ留置費2',
    },
    {
      title: 'シャーシ留置費課税2',
      dataIndex: 'シャーシ留置費課税2',
      key: 'シャーシ留置費課税2',
    },
    {
      title: 'その他費用2',
      dataIndex: 'その他費用2',
      key: 'その他費用2',
    },
    {
      title: 'その他費用課税2',
      dataIndex: 'その他費用課税2',
      key: 'その他費用課税2',
    },
    {
      title: '高速費3',
      dataIndex: '高速費3',
      key: '高速費3',
    },
    {
      title: 'スケール費3',
      dataIndex: 'スケール費3',
      key: 'スケール費3',
    },
    {
      title: 'スケール費課税3',
      dataIndex: 'スケール費課税3',
      key: 'スケール費課税3',
    },
    {
      title: 'シャーシ留置費3',
      dataIndex: 'シャーシ留置費3',
      key: 'シャーシ留置費3',
    },
    {
      title: 'シャーシ留置費課税3',
      dataIndex: 'シャーシ留置費課税3',
      key: 'シャーシ留置費課税3',
    },
    {
      title: 'その他費用3',
      dataIndex: 'その他費用3',
      key: 'その他費用3',
    },
    {
      title: 'その他費用課税3',
      dataIndex: 'その他費用課税3',
      key: 'その他費用課税3',
    },
    {
      title: '請求内容',
      dataIndex: '請求内容',
      key: '請求内容',
    },
    {
      title: '配車日',
      dataIndex: '配車日',
      key: '配車日',
    },
    {
      title: '仮依頼書作成日',
      dataIndex: '仮依頼書作成日',
      key: '仮依頼書作成日',
    },
    {
      title: '依頼書作成日',
      dataIndex: '依頼書作成日',
      key: '依頼書作成日',
    },
    {
      title: '送り状受領書作成日',
      dataIndex: '送り状受領書作成日',
      key: '送り状受領書作成日',
    },
    {
      title: 'mail作成日',
      dataIndex: 'mail作成日',
      key: 'mail作成日',
    },
    {
      title: '請求書作成日',
      dataIndex: '請求書作成日',
      key: '請求書作成日',
    },
    {
      title: 'フォーム',
      dataIndex: 'フォーム',
      key: 'フォーム',
    },
    {
      title: '備考',
      dataIndex: '備考',
      key: '備考',
    },
    {
      title: '配車シート名',
      dataIndex: '配車シート名',
      key: '配車シート名',
    },
    {
      title: '配車シート記録X',
      dataIndex: '配車シート記録X',
      key: '配車シート記録X',
    },
    {
      title: '配車シート記録Y',
      dataIndex: '配車シート記録Y',
      key: '配車シート記録Y',
    },
    {
      title: '登録年月',
      dataIndex: '登録年月',
      key: '登録年月',
    },
    {
      title: '案件コード',
      dataIndex: '案件コード',
      key: '案件コード',
    }
  ]
  useEffect(() => {
    const run = async () => {
      const res = await axios.get('/order');
      setDatas(res.data);
    }
    run();
  }, [])

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex flex-col sm:flex-row justify-evenly w-full'>
        <Typography className='flex justify-center'>
          <Title level={3}>{date}</Title>
        </Typography>
        <div className='flex justify-evenly max-w-lg w-full'>
          <Button>読込</Button>
          <Button>読込全件</Button>
        </div>
      </div>

      <div className='w-full'>
        <Table dataSource={datas} columns={columns} scroll={{ x: 'max-content' }} size='small' className='table-fixed' pagination={{pageSize:20}} />
      </div>
    </div>
  )
}

export default PaymentPage
