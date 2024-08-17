import { Divider, Table } from 'antd';
import { useState } from 'react'

const InvoicingPage = () => {
  const dataSource = [
    {
      key: '0',
      name: '課税（10％対象）',
      value: 8193,
    },
    {
      key: '1',
      name: '消費税（10％）',
      value: 819,
    },
    {
      key: '2',
      name: '非課税',
      value: 0,
    },
    {
      key: '3',
      name: '御請求金額	',
      value: 9012,
    }
  ];
  
  const orderData = [
    {
      "key": "0",
      "code": "MA240422-0004",
      "date": "2024/1/3",
      "loading": "青海A-4",
      "deliver": "株式会社アルプス物流",
      "item": "C12345",
      "kind": "40",
      "classify": "課税",
      "basicMount": 5000,
      "amount": 1,
      "subTotal": 5000,
      "tax": 500,
      "sum": 5500
    },
    {
      "key": "1",
      "code": "MA240422-0003",
      "date": "2024/1/3",
      "loading": "青海A-4",
      "deliver": "株式会社アルプス物流",
      "item": "C12345",
      "kind": "40",
      "classify": "課税",
      "basicMount": 2000,
      "amount": 1,
      "subTotal": 2000,
      "tax": 200,
      "sum": 2200
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (num) => `${num.toLocaleString()}円`
    }
  ];

  const orderColumns = [
    {
      title: '受注コード',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '日付',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '積地',
      dataIndex: 'loading',
      key: 'loading'
    },
    {
      title: '配達先',
      dataIndex: 'deliver',
      key: 'deliver'
    },
    {
      title: '品目',
      dataIndex: 'item',
      key: 'item'
    },
    {
      title: '種類',
      dataIndex: 'kind',
      key: 'kind'
    },
    {
      title: '区分',
      dataIndex: 'classify',
      key: 'classify'
    },
    {
      title: '基本料金',
      dataIndex: 'basicMount',
      key: 'basicMount',
      render: (num) => `${num.toLocaleString()}円`
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: '小計',
      dataIndex: 'subTotal',
      key: 'subTotal'
    },
    {
      title: '消費税',
      dataIndex: 'tax',
      key: 'tax'
    },
    {
      title: '合計',
      dataIndex: 'sum',
      key: 'sum'
    },
    {
      title: '備考',
      dataIndex: 'remark',
      key: 'remark'
    }
  ];

  return (
    <div className='flex flex-col justify-center w-full'>
      <h2 className='m-auto'>御請求書</h2>
      <Divider className='w-full m-2' />
      <div className="flex justify-around w-full">
        <div>
          <b>請求元情報</b>
          <p className='text-text-300 pt-1'>作成日: 2024/08/15</p>
        </div>
        <div>
          <b>㈱近鉄エクスプレス 輸入 御中</b>
          <p className='text-text-300 pt-1'>2024年1月締め</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className='md:w-[50%]'>
          <h3 className='m-auto py-5'>請求先情報</h3>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <p><b>顧客</b>: LogiTechnoService株式会社</p>
            <p><b>住所</b>: 東京都武蔵村山市神明2-51-15</p>
            <p><b>事業者登録番号</b>: T1012801022526</p>
            <p><b>銀行名</b>: 山梨中央銀行（銀行コード0142）</p>
            <p><b>支店名</b>: 立川支店（支店コード207）</p>
            <p><b>口座名</b>: 普通 704264 ロジテクノサービス（カ）</p>
          </div>
        </div>
        <div className='md:w-[50%]'>
          <h3 className='m-auto pt-5'>御請求金額</h3>
          <div className='pt-2'>
            <Table dataSource={dataSource} columns={columns} size='small' />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center py-5">
        <Table dataSource={orderData} columns={orderColumns} scroll={{x: 320}} className='w-full'  />
      </div>
    </div>
  )
}

export default InvoicingPage
