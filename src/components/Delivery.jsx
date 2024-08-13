import React from 'react';
import Group from './Group';
import { Tabs } from 'antd';

const Delivery1 = () => {
  return (
    <div>
      1
    </div>
  )
}

const Delivery2 = () => {
  return (
    <div>
      2
    </div>
  )
}

const Delivery3 = () => {
  return (
    <div>
      3
    </div>
  )
}

const Delivery = ({ className = '' }) => {
  const deliveryTab = ['配達1', '配達2', '配達3'];
  const dialogComponent = [<Delivery1 />, <Delivery2 />, <Delivery3 />];
  return (
    <div className={`${className}`}>
      <Group label={"配達"}>
        <Tabs type='card' items={deliveryTab.map((item, index) => {
          return {
            label: item,
            key: index,
            children: dialogComponent[index]
          }
        })} />
      </Group>
    </div>
  );
};

export default Delivery;
