import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Waybill = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th>納入日</th>
          <th>荷主</th>
        </tr>
        <tr>
          <td>{data?.date}</td>
          <td>{data?.shipper}</td>
        </tr>
        <tr>
          <th>納入時間</th>
          <th>納入先　住所</th>
        </tr>
        <tr>
          <td>{data?.time}</td>
          <td>{data?.address}</td>
        </tr>
        <tr>
          <th>本船名</th>
          <th>品名</th>
        </tr>
        <tr>
          <td>{data?.vessel}</td>
          <td rowspan="2">{data?.item}</td>
        </tr>
        <tr>
          <th>重量</th>
        </tr>
        <tr>
          <td>{data?.weight}</td>
          <th>個数・荷姿</th>
        </tr>
        <tr>
          <th>コンテナNo.</th>
          <td rowspan="2">{data?.quantity}</td>
        </tr>
        <tr>
          <td>{data?.number}</td>
        </tr>
        <tr>
          <th colspan="2">備考</th>
        </tr>
        <tr>
          <td colspan="2">{data?.notes}</td>
        </tr>
      </table>
    </div >
  );
};

export default Waybill;