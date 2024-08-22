import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Color = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th colspan="2">フラグ色設定</th>
        </tr>
        <tr>
          <td>配車表：取り</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.up}`}} />
        </tr>
        <tr>
          <td>配車表：ピックのみ</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.only}`}} />
        </tr>
        <tr>
          <td>配車表：配達</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.deliver}`}} />
        </tr>
        <tr>
          <td>配車表：搬入返却</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.back}`}} />
        </tr>
        <tr>
          <td>配車表・カレンダー：仮依頼書済</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.tentative}`}} />
        </tr>
        <tr>
          <td>配車表・カレンダー：依頼書済</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.request}`}} />
        </tr>
        <tr>
          <td>カレンダー：メール配信済</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.sent}`}} />
        </tr>
        <tr>
          <td>カレンダー：ピックチェックオン</td>
          <td className="min-w-12" style={{backgroundColor: `${data?.on}`}} />
        </tr>
      </table>
    </div >
  );
};

export default Color;