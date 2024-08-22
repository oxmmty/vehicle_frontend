import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Mail = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th colspan="2">メール本文</th>
        </tr>
        <tr>
          <th>文頭</th>
          <td dangerouslySetInnerHTML={{ __html: data?.start }} />
        </tr>
        <tr>
          <th>文末</th>
          <td>{data?.end}</td>
        </tr>
      </table>
    </div >
  );
};

export default Mail;