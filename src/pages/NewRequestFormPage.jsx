import React, { useRef } from "react";
import { Typography, Button } from "antd";
import "src/assets/styles/Table.css";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const NewRequestFormPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data);

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
              <td>{data.識別コード}</td>
              <th>区分</th>
              <td>{data.区分}</td>
              <th>依頼日</th>
              <td>{data.依頼日}</td>
            </tr>
            <tr>
              <th>搬出場所</th>
              <td>{data.取場所}</td>
              <th>軸数</th>
              <td colSpan="3">{data.axles}</td>
            </tr>
            <tr>
              <th>コンテナ№</th>
              <td>{data.コンテナNo}</td>
              <th>コンテナタイプ</th>
              <td colSpan="3">{data.コンテナタイプ}</td>
            </tr>
            <tr>
              <th>コンテナサイズ</th>
              <td>{data.コンテナサイズ}</td>
              <th>コンテナ種類</th>
              <td>{data.コンテナ種類}</td>
              <th>危険品</th>
              <td>{data.危険品}</td>
            </tr>
            <tr>
              <th>配達先➀</th>
              <td>{data.配達先1}</td>
              <th>積日</th>
              <td colSpan="3">{data.積日1}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.配達日1}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.配達時間1}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.配達先住所1}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.配達先TEL1}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.配達先担当者1}</td>
            </tr>
            <tr>
              <th>基本料金</th>
              <td>{data.基本料金1}</td>
              <th>3軸料金</th>
              <td colSpan="3">{data["3軸料金1"]}</td>
            </tr>
            <tr>
              <th>配達先②</th>
              <td>{data.配達先2}</td>
              <th>積日</th>
              <td colSpan="3">{data.積日2}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.配達日2}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.配達時間2}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.配達先住所2}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.配達先TEL2}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.配達先担当者2}</td>
            </tr>
            <tr>
              <th>配達先③</th>
              <td>{data.配達先3}</td>
              <th>積日</th>
              <td colSpan="3">{data.積日3}</td>
            </tr>
            <tr>
              <th>配達日</th>
              <td>{data.配達日3}</td>
              <th>配達時間</th>
              <td colSpan="3">{data.配達時間3}</td>
            </tr>
            <tr>
              <th>配達先住所</th>
              <td colSpan="5">{data.配達先住所3}</td>
            </tr>
            <tr>
              <th>配達先TEL</th>
              <td>{data.配達先TEL3}</td>
              <th>配達先担当者</th>
              <td colSpan="3">{data.配達先担当者3}</td>
            </tr>
            <tr>
              <th>搬入・返却場所</th>
              <td colSpan="5">{data.搬入返却場所}</td>
            </tr>
            <tr>
              <th>本船名</th>
              <td>{data.船名}</td>
              <th>VOY.№</th>
              <td>{data.VOYNo}</td>
              <th>船社</th>
              <td>{data.船社}</td>
            </tr>
            <tr>
              <th>BK№</th>
              <td>{data.BKNo}</td>
              <th>BL№</th>
              <td colSpan="3">{data.BLNo}</td>
            </tr>
            <tr>
              <th>荷揚港</th>
              <td>{data.荷揚港}</td>
              <th>最終仕向地</th>
              <td colSpan="3">{data.最終仕向}</td>
            </tr>
            <tr>
              <th>荷主名</th>
              <td colSpan="5">{data.荷主名}</td>
            </tr>
            <tr>
              <th>スケール費</th>
              <td>{data.スケール費}</td>
              <th>シャーシ留置費</th>
              <td colSpan="3">{data.シャーシ留置費}</td>
            </tr>
            <tr>
              <th>高速費</th>
              <td>{data.高速費}</td>
              <th>その他費用</th>
              <td colSpan="3">{data.その他費用}</td>
            </tr>
            <tr>
              <th>料金</th>
              <td colSpan="5">{data.下払料金1}</td>
            </tr>
            <tr>
              <th colSpan="6">備考欄</th>
            </tr>
            <tr>
              <td className="h-36" colSpan="6">
                {data.依頼書備考1}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewRequestFormPage;

// import React, { useRef } from "react";
// import { Button, Typography } from "antd";
// import {
//   PDFDownloadLink,
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   PDFViewer,
// } from "@react-pdf/renderer";
// import "src/assets/styles/Table.css";
// import { useLocation } from "react-router-dom";

// // Styles for the PDF document
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontFamily: "Arial",
//     fontSize: 12,
//     color: "black",
//   },
//   section: {
//     marginBottom: 10,
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     margin: "auto",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   cell: {
//     width: "50%",
//     border: "1pt solid black",
//     padding: 5,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 10,
//     textAlign: "center",
//   },
// });

// const NewRequestFormPage = () => {
//   const location = useLocation();
//   const { data } = location.state || {};
//   console.log(data);

//   // PDF Document Component
//   const MyDocument = () => (
//     <Document>
//       <Page style={styles.page}>
//         <Text style={styles.title}>依頼書</Text>
//         <View style={styles.section}>
//           <Text strong>寿咲 御中</Text>
//           <Text>翔風運輸株式会社</Text>
//           <Text>担当：渡邉</Text>
//         </View>

//         {/* Table for Data */}
//         <View style={styles.table}>
//           <View style={styles.row}>
//             <Text style={styles.cell}>受注コード</Text>
//             <Text style={styles.cell}>{data.識別コード}</Text>
//             <Text style={styles.cell}>区分</Text>
//             <Text style={styles.cell}>{data.区分}</Text>
//             <Text style={styles.cell}>依頼日</Text>
//             <Text style={styles.cell}>{data.依頼日}</Text>
//           </View>
//           {/* Add more rows as needed */}
//           <View style={styles.row}>
//             <Text style={styles.cell}>搬出場所</Text>
//             <Text style={styles.cell}>{data.取場所}</Text>
//             <Text style={styles.cell}>軸数</Text>
//             <Text style={styles.cell} colSpan="3">
//               {data.axles}
//             </Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.cell}>配達先➀</Text>
//             <Text style={styles.cell}>{data.配達先1}</Text>
//             <Text style={styles.cell}>配達日</Text>
//             <Text style={styles.cell}>{data.配達日1}</Text>
//             <Text style={styles.cell}>配達時間</Text>
//             <Text style={styles.cell}>{data.配達時間1}</Text>
//           </View>
//           {/* Continue adding other data rows in a similar fashion */}
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <div className="relative">
//       <Button type="primary" className="absolute right-7 top-7">
//         <PDFDownloadLink
//           document={<MyDocument />}
//           fileName={`Request_${data?.識別コード || "document"}.pdf`}>
//           {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
//         </PDFDownloadLink>
//       </Button>
//       <div className="flex flex-col items-center mx-auto p-4">
//         <Typography>
//           <Typography.Title level={2}>依頼書</Typography.Title>
//         </Typography>
//         <div className="flex justify-between w-full">
//           <Typography.Text strong>寿咲 御中</Typography.Text>
//           <div className="flex flex-col">
//             <Typography.Text>翔風運輸株式会社</Typography.Text>
//             <Typography.Text type="secondary">担当：渡邉</Typography.Text>
//           </div>
//         </div>
//         <div id="specialTable" className="overflow-auto w-full">
//           <table>
//             <tr>
//               <th>受注コード</th>
//               <td>{data.識別コード}</td>
//               <th>区分</th>
//               <td>{data.区分}</td>
//               <th>依頼日</th>
//               <td>{data.依頼日}</td>
//             </tr>
//             {/* Continue adding your original table rows here */}
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewRequestFormPage;
