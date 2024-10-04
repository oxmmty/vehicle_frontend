import React, { useRef } from "react";
import { Typography, Button } from "antd";
import "src/assets/styles/Table.css";

const { Title, Text } = Typography;

const NewRequestFormPage = () => {
  const data = {
    order: "MA240618-0001",
    category: "実入り取り",
    request: "2024/6/19",
    removal: "青海A-4",
    axles: "",
    container: "C12345",
    type1: "",
    size: "40",
    type2: "",
    goods: "いいえ",
    destination1: "株式会社アルプス物流",
    loading1: "2024/1/2",
    date1: "2024/1/3",
    time1: "1:00:00",
    address1: "神奈川県横浜市港北区新羽町1756　2号棟",
    telephone1: "",
    charge1: "",
    basic: "",
    axle3: "",
    destination2: "",
    loading2: "",
    date2: "",
    time2: "",
    address2: "",
    telephone2: "",
    charge2: "",
    destination3: "",
    loading3: "",
    date3: "",
    time3: "",
    address3: "",
    telephone3: "",
    charge3: "",
    place: "",
    vessel: "",
    voy: "",
    company: "",
    bk: "",
    bl: "",
    discharge: "",
    final: "",
    consignor: "",
    scale: "",
    chassis: "",
    highway: "",
    other: "",
    fee: "",
    remarks: "",
  };

  const componentRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open("aaa", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title></title>
          <style>
            body {
              margin: 0;
              padding: 20px;
               text-align: center;
              font-family: Arial, sans-serif; /* Ensure a basic font is set */
              background-color: white; /* Set a white background for printing */
            }
            h2 {
              font-size: 20px;
            }
            table {
              font-size:15px;
              width: 100%;
              border-collapse: collapse;
              text-align: center;
            }
            th, td {
              border: 1px solid black;
              padding: 4px;
               text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
            table tr:last-child td:last-child {
              height: 80px; /* Set your desired height here */
            }
            /* Hide header and footer on print */
            @media print {
              header, footer {
                display: none;
              }
              body {
                -webkit-print-color-adjust: exact; /* Preserve colors in print */
                print-color-adjust: exact;
              }
              /* Hide the button during print */
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${componentRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="relative">
      <Button
        type="primary"
        onClick={handlePrint}
        className="absolute right-7 top-7">
        Print PDF
      </Button>
      <div
        className="flex flex-col items-center mx-auto p-4"
        ref={componentRef}>
        <Typography>
          <Title level={2}>依頼書</Title>
        </Typography>
        <div className="flex justify-between w-full">
          <Text strong>寿咲 御中</Text>
          <div className="flex flex-col">
            <Text>翔風運輸株式会社</Text>
            <Text type="secondary">担当：渡邉</Text>
          </div>
        </div>
        <div id="specialTable" className="overflow-auto w-full">
          <table>
            <tr>
              <th>受注コード</th>
              <td>{data.order}</td>
              <th>区分</th>
              <td>{data.category}</td>
              <th>依頼日</th>
              <td>{data.request}</td>
            </tr>
            <tr>
              <th>搬出場所</th>
              <td>{data.removal}</td>
              <th>軸数</th>
              <td colSpan="3">{data.axles}</td>
            </tr>
            <tr>
              <th>コンテナ№</th>
              <td>{data.container}</td>
              <th>コンテナタイプ</th>
              <td colSpan="3">{data.type1}</td>
            </tr>
            <tr>
              <th>コンテナサイズ</th>
              <td>{data.size}</td>
              <th>コンテナ種類</th>
              <td>{data.type2}</td>
              <th>危険品</th>
              <td>{data.goods}</td>
            </tr>
            <tr>
              <th>配達先➀</th>
              <td>{data.destination1}</td>
              <th>積日</th>
              <td colSpan="3">{data.loading1}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.date1}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.time1}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.address1}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.telephone1}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.charge1}</td>
            </tr>
            <tr>
              <th>基本料金</th>
              <td>{data.basic}</td>
              <th>3軸料金</th>
              <td colSpan="3">{data.axle3}</td>
            </tr>
            <tr>
              <th>配達先②</th>
              <td>{data.destination2}</td>
              <th>積日</th>
              <td colSpan="3">{data.loading2}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.date2}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.time2}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.address2}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.telephone2}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.charge2}</td>
            </tr>
            <tr>
              <th>配達先③</th>
              <td>{data.destination3}</td>
              <th>積日</th>
              <td colSpan="3">{data.loading3}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.date3}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.time3}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.address3}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.telephone3}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.charge3}</td>
            </tr>
            <tr>
              <th>搬入・返却場所</th>
              <td colSpan="5">{data.place}</td>
            </tr>
            <tr>
              <th>本船名</th>
              <td>{data.vessel}</td>
              <th>VOY.№</th>
              <td>{data.voy}</td>
              <th>船社</th>
              <td>{data.company}</td>
            </tr>
            <tr>
              <th>BK№</th>
              <td>{data.bk}</td>
              <th>BL№</th>
              <td colSpan="3">{data.bl}</td>
            </tr>
            <tr>
              <th>荷揚港</th>
              <td>{data.discharge}</td>
              <th>最終仕向地</th>
              <td colSpan="3">{data.final}</td>
            </tr>
            <tr>
              <th>荷主名</th>
              <td colSpan="5">{data.consignor}</td>
            </tr>
            <tr>
              <th>スケール費</th>
              <td>{data.scale}</td>
              <th>シャーシ留置費</th>
              <td colSpan="3">{data.chassis}</td>
            </tr>
            <tr>
              <th>高速費</th>
              <td>{data.highway}</td>
              <th>その他費用</th>
              <td colSpan="3">{data.other}</td>
            </tr>
            <tr>
              <th>料金</th>
              <td colSpan="5">{data.fee}</td>
            </tr>
            <tr>
              <th colSpan="6">備考欄</th>
            </tr>
            <tr>
              <td className="h-36" colSpan="6">
                {data.remarks}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewRequestFormPage;
