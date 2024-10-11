import React, { useRef } from "react";
import { Typography, Button } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // Import html2canvas
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import "./NewRequestFormPage.css"; // Import your CSS file

const { Title, Text } = Typography;

const NewRequestFormPage = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const componentRef = useRef();

  const handleDownloadPDF = () => {
    axios
      .put("/pdfList", {
        リクエスト番号: data[0].リクエスト番号,
      })
      .then((response) => {
        console.log("Database updated successfully", response);

        // Generate the PDF after the database is successfully updated
        html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 190;
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          let position = 0;

          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(
            `${data[0].下払会社名} ${dayjs(data[0].配達日1).format(
              "YYMMDD",
            )}${dayjs(data[0].配達時間1).format("HHmm")} ${data[0].配達先} ${
              data[0].受注コード
            }.pdf`,
          );
        });
      })
      .catch((error) => {
        console.error("Error updating the database", error);
      });
  };

  const formatDate = (date) => {
    if (date === null) return ""; // Return empty string if the date is null
    return dayjs(date).format("YYYY-MM-DD"); // Format date if it's not null
  };

  const formatTime = (time) => {
    if (time === null) return ""; // Return empty string if the time is null
    return dayjs(time, "HH:mm:ss").format("HH:mm"); // Format time
  };
  console.log(data);
  return (
    <div className="relative bg-white">
      <Button
        type="primary"
        onClick={handleDownloadPDF}
        className="absolute right-7 top-7">
        Download PDF
      </Button>
      <div
        className="flex flex-col items-center mx-auto p-4 text-black"
        ref={componentRef}>
        <Typography>
          <Title level={2} className="text-black">
            依頼書
          </Title>
        </Typography>
        <div className="flex justify-between w-full text-black">
          <Text strong className="text-black">
            {data[0].下払会社名} 御中
          </Text>
          <div className="flex flex-col text-black">
            <Text className="text-black">翔風運輸株式会社</Text>
            <Text type="secondary" className="text-black">
              担当：渡邉
            </Text>
          </div>
        </div>
        <div id="specialTable" className="overflow-auto w-full bg-white">
          <table className="styled-table bg-white">
            <tbody>
              <tr>
                <th>受注コード</th>
                <td>{data[0].受注コード}</td>
                <th>区分</th>
                <td>{data[0].区分}</td>
                <th>依頼日</th>
                <td>{formatDate(data[0].依頼日)}</td>
              </tr>
              <tr>
                <th>搬出場所</th>
                <td>{data[0].搬出場所}</td>
                <th>軸数</th>
                <td colSpan="3">{data[0].軸数}</td>
              </tr>
              <tr>
                <th>コンテナ№</th>
                <td>{data[0].コンテナNo}</td>
                <th>コンテナタイプ</th>
                <td colSpan="3">{data[0].コンテナタイプ}</td>
              </tr>
              <tr>
                <th>コンテナサイズ</th>
                <td>{data[0].コンテナサイズ}</td>
                <th>コンテナ種類</th>
                <td>{data[0].コンテナ種類}</td>
                <th>危険品</th>
                <td>{data[0].危険品}</td>
              </tr>
              <tr>
                <th>配達先➀</th>
                <td>{data[0].配達先}</td>
                <th>積日</th>
                <td colSpan="3">{formatDate(data[0].積日1)}</td>
              </tr>
              <tr>
                <th>配達日</th>
                <td>{formatDate(data[0].配達日1)}</td>
                <th>配達時間</th>
                <td colSpan="3">{formatTime(data[0].配達時間1)}</td>
              </tr>
              <tr>
                <th>配達先住所</th>
                <td colSpan="5">{data[0].配達先住所1}</td>
              </tr>
              <tr>
                <th>配達先TEL</th>
                <td>{data[0].配達先TEL1}</td>
                <th>配達先担当者</th>
                <td colSpan="3">{data[0].配達先担当者1}</td>
              </tr>
              <tr>
                <th>基本料金</th>
                <td>{data[0].基本料金}円()</td>
                <th>3軸料金</th>
                <td colSpan="3">{data[0]["3軸料金1"]}</td>
              </tr>
              <tr>
                <th>配達先②</th>
                <td>{data[0].配達先2}</td>
                <th>積日</th>
                <td colSpan="3">{formatDate(data[0].積日2)}</td>
              </tr>
              <tr>
                <th>配達日</th>
                <td>{formatDate(data[0].配達日2)}</td>
                <th>配達時間</th>
                <td colSpan="3">{formatTime(data[0].配達時間2)}</td>
              </tr>
              <tr>
                <th>配達先住所</th>
                <td colSpan="5">{data[0].配達先住所2}</td>
              </tr>
              <tr>
                <th>配達先TEL</th>
                <td>{data[0].配達先TEL2}</td>
                <th>配達先担当者</th>
                <td colSpan="3">{data[0].配達先担当者2}</td>
              </tr>
              <tr>
                <th>配達先③</th>
                <td>{data[0].配達先3}</td>
                <th>積日</th>
                <td colSpan="3">{formatDate(data[0].積日3)}</td>
              </tr>
              <tr>
                <th>配達日</th>
                <td>{formatDate(data[0].配達日3)}</td>
                <th>配達時間</th>
                <td colSpan="3">{formatTime(data[0].配達時間3)}</td>
              </tr>
              <tr>
                <th>配達先住所</th>
                <td colSpan="5">{data[0].配達先住所3}</td>
              </tr>
              <tr>
                <th>配達先TEL</th>
                <td>{data[0].配達先TEL3}</td>
                <th>配達先担当者</th>
                <td colSpan="3">{data[0].配達先担当者3}</td>
              </tr>
              <tr>
                <th>搬入・返却場所</th>
                <td colSpan="5">{data[0].搬入返却場所}</td>
              </tr>
              <tr>
                <th>本船名</th>
                <td>{data[0].船名}</td>
                <th>VOY.№</th>
                <td>{data[0].VOYNo}</td>
                <th>船社</th>
                <td>{data[0].船社}</td>
              </tr>
              <tr>
                <th>BK№</th>
                <td>{data[0].BKNo}</td>
                <th>BL№</th>
                <td colSpan="3">{data[0].BLNo}</td>
              </tr>
              <tr>
                <th>荷揚港</th>
                <td>{data[0].荷揚港}</td>
                <th>最終仕向地</th>
                <td colSpan="3">{data[0].最終仕向}</td>
              </tr>
              <tr>
                <th>荷主名</th>
                <td colSpan="5">{data[0].荷主名}</td>
              </tr>
              <tr>
                <th>スケール費</th>
                <td>{data[0].スケール費}</td>
                <th>シャーシ留置費</th>
                <td colSpan="3">{data[0].シャーシ留置費}</td>
              </tr>
              <tr>
                <th>高速費</th>
                <td>{data[0].高速費}</td>
                <th>その他費用</th>
                <td colSpan="3">{data[0].その他費用}</td>
              </tr>
              <tr>
                <th>料金</th>
                <td colSpan="5">{data[0].基本料金}</td>
              </tr>
              <tr>
                <th colSpan="6">備考欄</th>
              </tr>
              <tr>
                <td className="h-36" colSpan="6">
                  {data[0].依頼書備考1}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewRequestFormPage;
