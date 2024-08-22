import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Establish = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th colspan="2">事業所設定</th>
        </tr>
        <tr>
          <th>事業所コード</th>
          <td>{data?.code}</td>
        </tr>
        <tr>
          <th>事業所名</th>
          <td>{data?.name}</td>
        </tr>
        <tr>
          <th>連番更新日</th>
          <td>{data?.date}</td>
        </tr>
        <tr>
          <th>識別コード連番</th>
          <td>{data?.number}</td>
        </tr>
      </table>
    </div >
  );
};

export default Establish;