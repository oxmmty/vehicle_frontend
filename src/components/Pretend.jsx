import { Table } from 'antd';
import React from 'react';
import "src/assets/styles/Table.css";

const Pretend = ({ data, ...props }) => {
  return (
    <div id='specialTable' className={`${props.className} overflow-auto`}>
      <table>
        <tr>
          <th>受注コード</th>
          <td>{data?.order}</td>
          <th>区分</th>
          <td>{data?.category}</td>
          <th>依頼日</th>
          <td>{data?.request}</td>
        </tr>
        <tr>
          <th>搬出場所</th>
          <td>{data?.removal}</td>
          <th>軸数</th>
          <td colspan="3">{data?.axles}</td>
        </tr>
        <tr>
          <th>コンテナ№</th>
          <td>{data?.container}</td>
          <th>コンテナタイプ</th>
          <td colspan="3">{data?.type1}</td>
        </tr>
        <tr>
          <th>コンテナサイズ</th>
          <td>{data?.size}</td>
          <th>コンテナ種類</th>
          <td>{data?.type2}</td>
          <th>危険品</th>
          <td>{data?.goods}</td>
        </tr>
        <tr>
          <th>配達先➀</th>
          <td>{data?.destination1}</td>
          <th>積日</th>
          <td colspan="3">{data?.loading1}</td>
        </tr>
        <tr>
          <th>配達日</th>
          <td>{data?.date1}</td>
          <th>配達時間</th>
          <td colspan="3">{data?.time1}</td>
        </tr>
        <tr>
          <th>配達先住所</th>
          <td colspan="5">{data?.address1}</td>
        </tr>
        <tr>
          <th>配達先TEL</th>
          <td>{data?.telephone1}</td>
          <th>配達先担当者</th>
          <td colspan="3">{data?.charge1}</td>
        </tr>
        <tr>
          <th>基本料金</th>
          <td>{data?.basic}</td>
          <th>3軸料金</th>
          <td colspan="3">{data?.axle3}</td>
        </tr>
        <tr>
          <th>配達先②</th>
          <td>{data?.destination2}</td>
          <th>積日</th>
          <td colspan="3">{data?.loading2}</td>
        </tr>
        <tr>
          <th>配達日</th>
          <td>{data?.date2}</td>
          <th>配達時間</th>
          <td colspan="3">{data?.time2}</td>
        </tr>
        <tr>
          <th>配達先住所</th>
          <td colspan="5">{data?.address2}</td>
        </tr>
        <tr>
          <th>配達先TEL</th>
          <td>{data?.telephone2}</td>
          <th>配達先担当者</th>
          <td colspan="3">{data?.charge2}</td>
        </tr>
        <tr>
          <th>配達先③</th>
          <td>{data?.destination3}</td>
          <th>積日</th>
          <td colspan="3">{data?.loading3}</td>
        </tr>
        <tr>
          <th>配達日</th>
          <td>{data?.date3}</td>
          <th>配達時間</th>
          <td colspan="3">{data?.time3}</td>
        </tr>
        <tr>
          <th>配達先住所</th>
          <td colspan="5">{data?.address3}</td>
        </tr>
        <tr>
          <th>配達先TEL</th>
          <td>{data?.telephone3}</td>
          <th>配達先担当者</th>
          <td colspan="3">{data?.charge3}</td>
        </tr>
        <tr>
          <th>搬入・返却場所</th>
          <td colspan="5">{data?.place}</td>
        </tr>
        <tr>
          <th>本船名</th>
          <td>{data?.vessel}</td>
          <th>VOY.№</th>
          <td>{data?.voy}</td>
          <th>船社</th>
          <td>{data?.company}</td>
        </tr>
        <tr>
          <th>BK№</th>
          <td>{data?.bk}</td>
          <th>BL№</th>
          <td colspan="3">{data?.bl}</td>
        </tr>
        <tr>
          <th>荷揚港</th>
          <td>{data?.discharge}</td>
          <th>最終仕向地</th>
          <td colspan="3">{data?.final}</td>
        </tr>
        <tr>
          <th>荷主名</th>
          <td colspan="5">{data?.consignor}</td>
        </tr>
        <tr>
          <th>スケール費</th>
          <td>{data?.scale}</td>
          <th>シャーシ留置費</th>
          <td colspan="3">{data?.chassis}</td>
        </tr>
        <tr>
          <th>高速費</th>
          <td>{data?.highway}</td>
          <th>その他費用</th>
          <td colspan="3">{data?.other}</td>
        </tr>
        <tr>
          <th>料金</th>
          <td colspan="5">{data?.fee}</td>
        </tr>
        <tr>
          <th colspan="6">備考欄</th>
        </tr>
        <tr>
          <td colspan="6">{data?.remarks}</td>
        </tr>
      </table>
    </div >
  );
};

export default Pretend;