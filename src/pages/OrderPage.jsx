import { Button, Card, Tabs, Form, DatePicker, Checkbox, Input, Select } from 'antd';
import { useState } from 'react'
import Group from 'src/components/Group';
import Delivery from 'src/components/Delivery';

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
    <div className='flex h-[500px] overflow-y-auto'>
      <Form layout='vertical' className='w-[50%]'>
        <Form.Item label={"請求日"} className='mb-12'>
          <div className='flex items-center gap-5'>
            <DatePicker onChange={onDate} className='w-80' />
            <Checkbox>ピックチェック</Checkbox>
            <Checkbox>配車組み</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"部署コード"} required className='mb-12'>
          <div className='flex gap-5'>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input className='w-80' />
            </Form.Item>
            <Form.Item>
              <Checkbox>空バン返却チェック</Checkbox>
            </Form.Item>
            <Form.Item>
              <Checkbox>送り状・受領書作成</Checkbox>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label={"区別する"} required className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 320 }} options={distinguish} />
            <Checkbox>未定</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"所有者の名前"} className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"顧客名"} required className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={distinguish} />
          </div>
        </Form.Item>
        <Form.Item label={"CRUの顧客名"} className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"取場所"} className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={distinguish} />
          </div>
        </Form.Item>
        <Form.Item label={"搬入・返却場所"} className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={owner} />
          </div>
        </Form.Item>
        <Form.Item label={"船社"} className='mb-12'>
          <div className='flex gap-5'>
            <Select defaultValue={1} style={{ width: 640 }} options={distinguish} />
          </div>
        </Form.Item>
        <Group label={"受注入力"}>
          <div className='flex gap-5'>
            <Form.Item label={"No."}>
              <div className='flex gap-5'>
                <Input className='w-60' />
              </div>
            </Form.Item>
            <Form.Item label={"タイプ"}>
              <div className='flex gap-5'>
                <Select defaultValue={1} style={{ width: 70 }} options={number} />
              </div>
            </Form.Item>
            <Form.Item label={"サイズ"}>
              <div className='flex gap-5'>
                <Select defaultValue={1} style={{ width: 70 }} options={number} />
              </div>
            </Form.Item>
            <Form.Item label={"種類"}>
              <div className='flex gap-5'>
                <Select defaultValue={1} style={{ width: 140 }} options={distinguish} />
              </div>
            </Form.Item>
            <Form.Item className='pt-3'>
              <Checkbox>3軸</Checkbox>
              <Checkbox>危険品</Checkbox>
            </Form.Item>
          </div>
        </Group>
        <Form.Item name="name" rules={[{ required: true }]} className='mt-6 mb-16'>
          <div className='flex gap-5'>
            <Form.Item label={"BK No."}>
              <Input className='w-56' />
            </Form.Item>
            <Form.Item label={"BL No."}>
              <Input className='w-56' />
            </Form.Item>
            <Form.Item label={"船名"}>
              <Input className='w-56' />
            </Form.Item>
          </div>
        </Form.Item>
        <Delivery className='w-[720px]'/>
      </Form>
      <Form layout='vertical' className='w-[50%]'>
        <Form.Item label={"請求日"} className='mb-12'>
          <DatePicker onChange={onDate} />
          <Checkbox>ピックチェック</Checkbox>
          <Checkbox>配車組み</Checkbox>
        </Form.Item>
      </Form>
    </div >
  )
}

const TruckComponent = () => {
  return (
    <div className='h-[500px] overflow-y-auto'>
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
    <div className='flex justify-center items-center p-1'>
      <Form className="min-w-[1500px] min-h-[750px] bg-base-100 rounded-md">
        <Card title={"受注入力"}>
          <Tabs type='card' items={tabNames.map((item, index) => {
            return {
              label: item,
              key: index,
              children: dialogComponent[index]
            }
          })} />
        </Card>
        <div className='flex justify-end gap-5 p-7'>
          <Button type='primary'>初期化</Button>
          <Button type='primary' danger>請求済削除</Button>
        </div>
      </Form>
    </div>
  )
}

export default OrderPage
