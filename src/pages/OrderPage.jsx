import { Button, Tabs, Form, DatePicker, Checkbox, Input, Select } from 'antd';
import { useState } from 'react'
import Group from 'src/components/Group';
import Delivery from 'src/components/Delivery';
import PackageInfo from 'src/components/PackageInfo';
import SubcontractPayment from 'src/components/SubcontractPayment';
import Storage from 'src/components/Storage';

const { TextArea } = Input;
const SeaComponent = () => {
  const distinguish = [
    {
      value: 0,
      label: '実入り取り',
    },
    {
      value: 1,
      label: '空バン取り',
    },
    {
      value: 2,
      label: '実入り取りCRU',
    }
  ]
  const owner = [
    {
      value: 0,
      label: '荷主A',
    },
    {
      value: 1,
      label: '荷主B',
    },
    {
      value: 2,
      label: '荷主C',
    }
  ]
  const number = [
    {
      value: 0,
      label: '99',
    },
    {
      value: 1,
      label: '98',
    },
    {
      value: 2,
      label: '2',
    }
  ]

  const onDate = () => {

  }
  return (
    <div className='flex flex-col md:flex-row md:gap-4'>
      <Form layout='vertical' id='請求日' className='anchor-section md:w-[50%]'>
        <Form.Item label={"請求日"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <DatePicker onChange={onDate} className='grow' />
            <Checkbox>ピックチェック</Checkbox>
            <Checkbox>配車組み</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"部署コード"} required>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Input required className='w-fit grow' />
            <Checkbox>空バン返却チェック</Checkbox>
            <Checkbox>送り状・受領書作成</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"区別する"} required>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} style={{ width: 100 }} className='grow' options={distinguish} />
            <Checkbox>未定</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"所有者の名前"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"顧客名"} required>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={distinguish} />
          </div>
        </Form.Item>
        <Form.Item label={"CRUの顧客名"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"取場所"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={distinguish} />
          </div>
        </Form.Item>
        <Form.Item label={"搬入・返却場所"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"船社"}>
          <div className='flex flex-wrap flex-row items-center gap-4'>
            <Select defaultValue={1} className='grow' options={distinguish} />
          </div>
        </Form.Item>
        <Group label={"受注入力"}>
          <div className='flex flex-wrap flex-row items-center gap-x-4 w-full anchor-section' id='受注入力'>
            <Form.Item label={"No."} className='w-10 grow'>
              <Input />
            </Form.Item>
            <Form.Item label={"タイプ"}>
              <Select defaultValue={1} style={{ width: 70 }} options={number} />
            </Form.Item>
            <Form.Item label={"サイズ"}>
              <Select defaultValue={1} style={{ width: 70 }} options={number} />
            </Form.Item>
            <Form.Item label={"種類"}>
              <Select defaultValue={1} style={{ width: 140 }} options={distinguish} />
            </Form.Item>
            <div className='flex flex-col'>
              <Checkbox>3軸</Checkbox>
              <Checkbox>危険品</Checkbox>
            </div>
          </div>
        </Group>
        <Form.Item name="name" rules={[{ required: true }]}>
          <div className='flex flex-wrap flex-row items-center gap-x-4'>
            <Form.Item label={"BK No."} className='w-10 grow'>
              <Input />
            </Form.Item>
            <Form.Item label={"BL No."} className='w-10 grow'>
              <Input />
            </Form.Item>
            <Form.Item label={"船名"} className='w-10 grow'>
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
        <Delivery />
        <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
          <div className='flex flex-wrap flex-row items-center gap-x-4'>
            <TextArea rows={4} className='grow' />
          </div>
        </Form.Item>
      </Form>
      <Form layout='vertical' className='md:w-[50%]'>
        <PackageInfo />
        <SubcontractPayment />
        <Storage />
      </Form>
    </div >
  )
}

const TruckComponent = () => {
  return (
    <div className='h-[900px] overflow-y-auto'>
      2
    </div>
  )
}

const OtherComponent = () => {
  return (
    <div className='h-[500px] overflow-y-auto'>
      3
    </div>
  )
}

const OrderPage = () => {
  const tabNames = ['海上コンテナ', 'トラック', 'その他']
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);
  const dialogComponent = [<SeaComponent />, <TruckComponent />, <OtherComponent />];
  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Tabs type='card' className='w-full' items={tabNames.map((item, index) => {
        return {
          label: item,
          key: index,
          children: dialogComponent[index]
        }
      })} />
      <div className='flex flex-row flex-wrap justify-center items-center gap-4 mb-[24px]'>
        <Button>デバックボタン</Button>
        <Button>動作確認設定</Button>
        <Button>画面リフレッシュ</Button>
        <Button>記録データ削除</Button>
        <Button>保存</Button>
        <Button>閉じる</Button>
      </div>
      <div className='flex justify-around max-w-96 w-full'>
        <Button type='primary'>初期化</Button>
        <Button type='default'>請求済削除</Button>
      </div>
    </div>
  )
}

export default OrderPage
