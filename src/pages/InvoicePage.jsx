import { Button, Divider, Select, Table, Typography } from "antd";
import { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import moment from "moment";

const { Title, Text } = Typography;

const InvoicePage = () => {
  const location = useLocation();
  const [datas, setDatas] = useState([]);
  const [課税1, set課税1] = useState("非課税");
  const [price1, setPrice1] = useState("");
  const [CRU課税1, setCRU課税1] = useState("非課税");
  const [CRUPrice1, setCRUPrice1] = useState("");
  const [軸課税1, set軸課税1] = useState("非課税");
  const [angle1, setAngle1] = useState("");
  const [高速費課税, set高速費課税] = useState("課税");
  const [費課税Price, set高速費Price] = useState("");
  const [スケール費課税1, setスケール費課税1] = useState("非課税");
  const [スケール費Price, setスケール費Price] = useState("");
  const [シャーシ留置費課税1, setシャーシ留置費課税1] = useState("非課税");
  const [シャーシ留置費Price, setシャーシ留置費Price] = useState("");
  const [その他課税, setその他課税] = useState("非課税");
  const [その他費用Price, setその他費用Price] = useState("");

  const [課税2, set課税2] = useState("非課税");
  const [price2, setPrice2] = useState("");
  const [CRU課税2, setCRU課税2] = useState("非課税");
  const [CRUPrice2, setCRUPrice2] = useState("");
  const [軸課税2, set軸課税2] = useState("非課税");
  const [angle2, setAngle2] = useState("");
  const [高速費課税2, set高速費課税2] = useState("課税");
  const [費課税Price2, set高速費Price2] = useState("");
  const [スケール費課税2, setスケール費課税2] = useState("非課税");
  const [スケール費Price2, setスケール費Price2] = useState("");
  const [シャーシ留置費課税2, setシャーシ留置費課税2] = useState("非課税");
  const [シャーシ留置費Price2, setシャーシ留置費Price2] = useState("");
  const [その他課税2, setその他課税2] = useState("非課税");
  const [その他費用Price2, setその他費用Price2] = useState("");

  const [課税3, set課税3] = useState("非課税");
  const [price3, setPrice3] = useState("");
  const [CRU課税3, setCRU課税3] = useState("非課税");
  const [CRUPrice3, setCRUPrice3] = useState("");
  const [軸課税3, set軸課税3] = useState("非課税");
  const [angle3, setAngle3] = useState("");
  const [高速費課税3, set高速費課税3] = useState("課税");
  const [費課税Price3, set高速費Price3] = useState("");
  const [スケール費課税3, setスケール費課税3] = useState("非課税");
  const [スケール費Price3, setスケール費Price3] = useState("");
  const [シャーシ留置費課税3, setシャーシ留置費課税3] = useState("非課税");
  const [シャーシ留置費Price3, setシャーシ留置費Price3] = useState("");
  const [その他課税3, setその他課税3] = useState("非課税");
  const [その他費用Price3, setその他費用Price3] = useState("");

  const { data } = location.state || {};
  const invoiceRef = useRef();
  const today = dayjs().format("YYYY/MM/DD");
  const dataSource = [
    { key: "0", name: "課税（30％対象）", value: 8193 },
    { key: "1", name: "消費税（10％）", value: 819 },
    { key: "2", name: "非課税", value: 0 },
    { key: "3", name: "御請求金額", value: 9012 },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/order/invoice", { params: { data } });

      setDatas(res.data);
    };
    fetchData();
  }, []);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (num) => `${num.toLocaleString()}円`,
    },
  ];

  useEffect(() => {
    if (datas.基本課税1) {
      set課税1("課税");
      setPrice1(datas.基本料金1 / 10);
    }
    if (datas["3軸課税1"]) {
      set軸課税1("課税");
      setAngle1(datas["3軸料金1"] / 10);
    }
    if (datas.CRU変更課税1) {
      setCRU課税1("課税");
      setCRUPrice1(datas.CRU変更料金1 / 10);
    }
    if (datas.高速費) {
      set高速費課税("課税");
      set高速費Price(datas.高速費 / 10);
    }
    if (datas.スケール費課税1) {
      setスケール費課税1("課税");
      setスケール費Price(datas.スケール費 / 10);
    }
    if (datas.シャーシ留置費課税1) {
      setシャーシ留置費課税1("課税");
      setシャーシ留置費Price(datas.スケール費 / 10);
    }
    if (datas.その他課税) {
      setその他課税("課税");
      setその他費用Price(datas.その他費用 / 10);
    }

    if (datas.基本課税2) {
      set課税2("課税");
      setPrice2(datas.基本料金2 / 10);
    }
    if (datas["3軸課税2"]) {
      set軸課税2("課税");
      setAngle2(datas["3軸料金2"] / 10);
    }
    if (datas.CRU変更課税2) {
      setCRU課税2("課税");
      setCRUPrice2(datas.CRU変更料金2 / 10);
    }
    if (datas.高速費2) {
      set高速費課税2("課税");
      set高速費Price2(datas.高速費2 / 10);
    }
    if (datas.スケール費課税2) {
      setスケール費課税2("課税");
      setスケール費Price2(datas.スケール費2 / 10);
    }
    if (datas.シャーシ留置費課税2) {
      setシャーシ留置費課税2("課税");
      setシャーシ留置費Price2(datas.シャーシ留置費2 / 10);
    }
    if (datas.その他課税2) {
      setその他課税2("課税");
      setその他費用Price2(datas.その他費用2 / 10);
    }

    if (datas.基本課税3) {
      set課税3("課税");
      setPrice3(datas.基本料金3 / 10);
    }
    if (datas["3軸課税3"]) {
      set軸課税3("課税");
      setAngle3(datas["3軸料金3"] / 10);
    }
    if (datas.CRU変更課税3) {
      setCRU課税3("課税");
      setCRUPrice3(datas.CRU変更料金3 / 10);
    }
    if (datas.高速費3) {
      set高速費課税3("課税");
      set高速費Price3(datas.高速費3 / 10);
    }
    if (datas.スケール費課税3) {
      setスケール費課税3("課税");
      setスケール費Price3(datas.スケール費3 / 10);
    }
    if (datas.シャーシ留置費課税3) {
      setシャーシ留置費課税3("課税");
      setシャーシ留置費Price3(datas.シャーシ留置費3 / 10);
    }
    if (datas.その他課税3) {
      setその他課税3("課税");
      setその他費用Price3(datas.その他費用3 / 10);
    }
  }, [datas]); // Only run this effect when 'datas' changes
  // const columns2 = [
  //   { key: "請求先", title: "請求先", dataIndex: "請求先" },
  //   { key: "会社名", title: "会社名", dataIndex: "会社名" },
  //   { key: "会社住所", title: "会社住所", dataIndex: "会社住所" },
  //   {
  //     key: "事業者登録番号",
  //     title: "事業者登録番号",
  //     dataIndex: "事業者登録番号",
  //   },
  //   { key: "タグ", title: "タグ", dataIndex: "タグ" },
  //   { key: "銀行名", title: "銀行名", dataIndex: "銀行名" },
  //   { key: "支店名", title: "支店名", dataIndex: "支店名" },
  //   { key: "口座名", title: "口座名", dataIndex: "口座名" },
  //   { key: "口座名義", title: "口座名義", dataIndex: "口座名義" },
  //   { key: "件名", title: "件名", dataIndex: "件名" },
  // ];

  const option = [
    { value: 0, label: "お客様" },
    { value: 1, label: "船社" },
    { value: 2, label: "下払" },
    { value: 3, label: "保管" },
  ];

  const handleDownloadPDF = () => {
    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
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

      pdf.save(`${moment().format("YYMMDD")}.pdf`);
    });
  };
  return (
    <div className="bg-white text-black">
      <div className="flex flex-col justify-center w-full p-5" ref={invoiceRef}>
        <Title level={2} className="m-auto text-black">
          御請求書
        </Title>
        <Divider className="w-full m-2 " />
        <div className="flex justify-around w-full ">
          <div>
            <Title level={5} className="text-black">
              請求元情報
            </Title>
            <Text type="secondary" className="text-black">
              作成日:{today}
            </Text>
          </div>
          <div>
            <Title level={5} className="text-black">
              ㈱近鉄エクスプレス 輸入 御中
            </Title>
            <Text type="secondary" className="text-black">
              {dayjs(today).format("YYYY年MM月")}締め
            </Text>
          </div>
        </div>
        <div className="flex flex-col md:flex-row px-2">
          <div className="md:w-[50%]">
            <Title level={4} className="m-auto py-4 text-black">
              請求先情報
            </Title>
            <div className="flex flex-wrap flex-row items-center text-black gap-5">
              <Typography className="text-black">
                <Text className="text-black" strong>
                  顧客
                </Text>
                : LogiTechnoService株式会社
              </Typography>
              <Typography className="text-black">
                <Text className="text-black" strong>
                  住所
                </Text>
                : 東京都武蔵村山市神明2-51-15
              </Typography>
              <Typography className="text-black">
                <Text className="text-black" strong>
                  事業者登録番号
                </Text>
                : T1012801022526
              </Typography>
              <Typography className="text-black">
                <Text className="text-black" strong>
                  銀行名
                </Text>
                : 山梨中央銀行（銀行コード0142）
              </Typography>
              <Typography className="text-black">
                <Text className="text-black" strong>
                  支店名
                </Text>
                : 立川支店（支店コード207）
              </Typography>
              <Typography className="text-black">
                <Text className="text-black" strong>
                  口座名
                </Text>
                : 普通 704264 ロジテクノサービス（カ）
              </Typography>
            </div>
          </div>
          <div className="md:w-[50%]">
            <Title level={4} className="m-auto pt-4 text-black">
              御請求金額
            </Title>
            <div className="pt-2">
              <table class="min-w-full divide-y divide-black border border-black">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left  border-black text-xs font-medium text-black uppercase tracking-wider">
                      項目
                    </th>
                    <th class="px-6 py-3 text-left  border-black text-xs font-medium text-black uppercase tracking-wider">
                      金額
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-x  divide-black">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      課税（10％対象）
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">8193</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">消費税（10％）</td>
                    <td class="px-6 py-4 whitespace-nowrap">819</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">非課税</td>
                    <td class="px-6 py-4 whitespace-nowrap">0</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">御請求金額</td>
                    <td class="px-6 py-4 whitespace-nowrap">9012</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center py-5">
          {/* <Table
          dataSource={orderData}
          columns={orderColumns}
          scroll={{ x: "max-content" }}
          pagination={false}
          className="w-full"
        /> */}
          <table class="min-w-full table-auto border-collapse border border-black text-black">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-black px-4 py-2">受注コード</th>
                <th class="border border-black px-4 py-2">日付</th>
                <th class="border border-black px-4 py-2">積地</th>
                <th class="border border-black px-4 py-2">配達先</th>
                <th class="border border-black px-4 py-2">品目</th>
                <th class="border border-black px-4 py-2">種類</th>
                <th class="border border-black px-4 py-2">区分</th>
                <th class="border border-black px-4 py-2">基本料金</th>
                <th class="border border-black px-4 py-2">数量</th>
                <th class="border border-black px-4 py-2">小計</th>
                <th class="border border-black px-4 py-2">消費税</th>
                <th class="border border-black px-4 py-2">合計</th>
              </tr>
            </thead>
            <tbody>
              {datas.配達先1 && (
                <tr>
                  <td class="border border-black px-4 py-2">
                    {datas.識別コード}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {dayjs(datas.積日1).format("YYYY-MM-DD")}
                  </td>
                  <td class="border border-black px-4 py-2">{datas.取場所}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.搬入返却場所}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナNo}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナサイズ}
                  </td>
                  <td class="border border-black px-4 py-2">{課税1}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金1}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金1}円
                  </td>
                  <td class="border border-black px-4 py-2">{price1}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金1 + price1}円
                  </td>
                </tr>
              )}
              {datas.CRU変更料金1 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">CRU</td>
                  <td class="border border-black px-4 py-2">{CRU課税1}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金1}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金1}円
                  </td>
                  <td class="border border-black px-4 py-2">{CRUPrice1}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金1 + CRUPrice1}円
                  </td>
                </tr>
              )}
              {datas["3軸料金1"] && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">3軸</td>
                  <td class="border border-black px-4 py-2">{軸課税1}</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金1"]}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金1"]}円
                  </td>
                  <td class="border border-black px-4 py-2">{angle1}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金1"] + angle1}円
                  </td>
                </tr>
              )}
              {datas.高速費 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">高速費</td>
                  <td class="border border-black px-4 py-2">{高速費課税}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費}円
                  </td>
                  <td class="border border-black px-4 py-2">{費課税Price}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費 + 費課税Price}円
                  </td>
                </tr>
              )}
              {datas.スケール費 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">スケール費</td>
                  <td class="border border-black px-4 py-2">
                    {スケール費課税1}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {スケール費Price}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費 + スケール費Price}円
                  </td>
                </tr>
              )}
              {datas.シャーシ留置費 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">シャーシ留置費 </td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費課税1}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費Price}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費 + シャーシ留置費Price}円
                  </td>
                </tr>
              )}
              {datas.その他費用 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">その他費用 </td>
                  <td class="border border-black px-4 py-2">{その他課税}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {その他費用Price}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用 + その他費用Price}円
                  </td>
                </tr>
              )}
              {datas.配達先2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">
                    {dayjs(datas.積日2).format("YYYY-MM-DD")}
                  </td>
                  <td class="border border-black px-4 py-2">{datas.取場所2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.搬入返却場所}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナNo}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナサイズ}
                  </td>
                  <td class="border border-black px-4 py-2">{課税2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金2}円
                  </td>
                  <td class="border border-black px-4 py-2">{price2}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金2 + price2}円
                  </td>
                </tr>
              )}
              {datas.CRU変更料金2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">CRU</td>
                  <td class="border border-black px-4 py-2">{CRU課税2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金2}円
                  </td>
                  <td class="border border-black px-4 py-2">{CRUPrice2}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金2 + CRUPrice2}円
                  </td>
                </tr>
              )}
              {datas["3軸料金2"] && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">3軸</td>
                  <td class="border border-black px-4 py-2">{軸課税2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金2"]}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金2"]}円
                  </td>
                  <td class="border border-black px-4 py-2">{angle2}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金2"] + angle2}円
                  </td>
                </tr>
              )}
              {datas.高速費2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">高速費</td>
                  <td class="border border-black px-4 py-2">{高速費課税2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {費課税Price2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費2 + 費課税Price2}円
                  </td>
                </tr>
              )}
              {datas.スケール費2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">スケール費</td>
                  <td class="border border-black px-4 py-2">
                    {スケール費課税2}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {スケール費Price2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費2 + スケール費Price2}円
                  </td>
                </tr>
              )}
              {datas.シャーシ留置費2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">シャーシ留置費</td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費課税2}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費Price2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費2 + シャーシ留置費Price2}円
                  </td>
                </tr>
              )}
              {datas.その他費用2 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">その他費用 </td>
                  <td class="border border-black px-4 py-2">{その他課税2}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用2}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {その他費用Price2}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用2 + その他費用Price2}円
                  </td>
                </tr>
              )}
              {datas.配達先3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">
                    {dayjs(datas.積日3).format("YYYY-MM-DD")}
                  </td>
                  <td class="border border-black px-4 py-2">{datas.取場所3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.搬入返却場所}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナNo}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.コンテナサイズ}
                  </td>
                  <td class="border border-black px-4 py-2">{課税3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金3}円
                  </td>
                  <td class="border border-black px-4 py-2">{price3}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.基本料金3 + price3}円
                  </td>
                </tr>
              )}
              {datas.CRU変更料金3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">CRU</td>
                  <td class="border border-black px-4 py-2">{CRU課税3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金3}円
                  </td>
                  <td class="border border-black px-4 py-2">{CRUPrice3}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas.CRU変更料金3 + CRUPrice3}円
                  </td>
                </tr>
              )}
              {datas["3軸料金3"] && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">3軸</td>
                  <td class="border border-black px-4 py-2">{軸課税3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金3"]}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金3"]}円
                  </td>
                  <td class="border border-black px-4 py-2">{angle3}円</td>
                  <td class="border border-black px-4 py-2">
                    {datas["3軸料金3"] + angle3}円
                  </td>
                </tr>
              )}
              {datas.高速費3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">高速費</td>
                  <td class="border border-black px-4 py-2">{高速費課税3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {費課税Price3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.高速費3 + 費課税Price3}円
                  </td>
                </tr>
              )}
              {datas.スケール費3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">スケール費</td>
                  <td class="border border-black px-4 py-2">
                    {スケール費課税3}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {スケール費Price3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.スケール費3 + スケール費Price3}円
                  </td>
                </tr>
              )}
              {datas.シャーシ留置費3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">シャーシ留置費</td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費課税3}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {シャーシ留置費Price3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.シャーシ留置費3 + シャーシ留置費Price3}円
                  </td>
                </tr>
              )}
              {datas.その他費用3 && (
                <tr>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2"></td>
                  <td class="border border-black px-4 py-2">その他費用 </td>
                  <td class="border border-black px-4 py-2">{その他課税3}</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用3}円
                  </td>
                  <td class="border border-black px-4 py-2">1</td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {その他費用Price3}円
                  </td>
                  <td class="border border-black px-4 py-2">
                    {datas.その他費用3 + その他費用Price3}円
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap flex-row items-center justify-end gap-5 p-5">
        <div className="flex justify-center items-center">請求先</div>
        <Select options={option} defaultValue={1} className="max-w-72 grow" />
        <Button type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button>
      </div>
      {/* <div className="flex w-full justify-center py-5">
        <Table
          columns={columns2}
          scroll={{ x: "max-content" }}
          className="w-full"
        />
      </div> */}
    </div>
  );
};

export default InvoicePage;
