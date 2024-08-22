import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Identify = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th>識別</th>
          <th>事業所名称</th>
        </tr>
        <tr>
          <td>{data?.identify}</td>
          <td>{data?.name}</td>
        </tr>
        <tr>
          <th>部署コード</th>
          <th>配車データ上書き確認</th>
        </tr>
        <tr>
          <td>{data?.code}</td>
          <td>{data?.confirm}</td>
        </tr>
      </table>
    </div >
  );
};

export default Identify;