import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const RequestListPage = () => {
  const location = useLocation();
  const datas = location.state?.data;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pdfDate, setPdfDate] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const componentRef = useRef();
  useEffect(() => {
    axios.get(`${process.env.REACT_API_BASE_URL}/order`).then((response) => {
      const transformedData = response.data.map((item) => ({
        ...item,
        配達日1: moment(item.配達日1).format("MM-DD"),
        配達時間1: item.配達時間1 || "",
        搬入返却場所: item.搬入返却場所 || "",
        取場所: item.取場所 || "",
        コンテナサイズ: item.コンテナサイズ || "",
        コンテナNo: item.コンテナNo || "",
        シャーシ留置費: item.シャーシ留置費 || "",
        work1: item.work1 || "",
        work2: item.work2 || "",
        work3: item.work3 || "",
        work4: item.work4 || "",
        work5: item.work5 || "",
        work6: item.work6 || "",
        識別コード: item.識別コード || "",
        請求書備考: item.請求書備考 || "",
      }));
      setData(transformedData);
    });

    axios
      .get(`${process.env.REACT_API_BASE_URL}/partnercompany`)
      .then((response) => {
        const companyList = [
          ...new Set(response.data.map((item) => item.協力会社)),
        ];
        setCompanies(companyList);
      });
  }, []);
  useEffect(() => {
    filterData();
  }, [selectedCompany, selectedDate, data]);
  const filterData = () => {
    let filtered = data;
    if (selectedCompany) {
      filtered = filtered.filter((item) =>
        [
          item.下払会社名1,
          item.下払会社名2,
          item.下払会社名3,
          item.下払会社名4,
          item.下払会社名5,
          item.下払会社名6,
        ].includes(selectedCompany),
      );
    }
    if (datas) {
      handleDateChange(datas);
    }
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("MM-DD");
      filtered = filtered.filter(
        (item) => moment(item.配達日1).format("MM-DD") === formattedDate,
      );
      setPdfDate(selectedDate);
    }
    setFilteredData(filtered);
  };
  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDownloadPDF = () => {
    if (pdfDate == null && selectedCompany == null) {
    }
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
      pdf.save(`${selectedCompany} ${moment(pdfDate).format("YYMMDD")}.pdf`);
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap flex-row w-full justify-between items-center gap-4 px-2">
        <div className="flex flex-col gap-4 mb-2">
          <Select
            placeholder="Select a company"
            onChange={handleCompanyChange}
            style={{ width: 200 }}
            allowClear>
            {companies.map((company) => (
              <Option key={company} value={company}>
                {company}
              </Option>
            ))}
          </Select>
          <DatePicker
            picker="date"
            onChange={(date, dateString) => {
              handleDateChange(dateString);
            }}
            format="YYYY/MM/DD"
            allowClear
          />
        </div>

        <Button type="primary" onClick={handleDownloadPDF}>
          PDF作成
        </Button>
      </div>

      <div ref={componentRef} className="bg-white p-4">
        <div className="text-center text-black">
          <Title level={5} className="text-black pt-5">
            翔風運輸株式会社　担当：渡邉
          </Title>
          <Text className="text-black">{today}</Text>
        </div>
        <div className="flex justify-between ml-48 mr-48 mt-6 mb-4">
          <Text className="text-black">{selectedCompany} 御中</Text>
          <Text className="text-black">
            {moment(pdfDate).format("YYYY-MM-DD")}
          </Text>
        </div>
        <table className="w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border border-black px-4 py-2">No</th>
              <th className="border border-black px-4 py-2">配達日</th>
              <th className="border border-black px-4 py-2">時間</th>
              <th className="border border-black px-4 py-2">搬出・搬入</th>
              <th className="border border-black px-4 py-2">作業先</th>
              <th className="border border-black px-4 py-2">サイズ</th>
              <th className="border border-black px-4 py-2">コンテナ番号</th>
              <th className="border border-black px-4 py-2">シャーシ</th>
              <th className="border border-black px-4 py-2">作業 1</th>
              <th className="border border-black px-4 py-2">作業 2</th>
              <th className="border border-black px-4 py-2">作業 3</th>
              <th className="border border-black px-4 py-2">作業 4</th>
              <th className="border border-black px-4 py-2">作業 5</th>
              <th className="border border-black px-4 py-2">作業 6</th>
              <th className="border border-black px-4 py-2">識別コード</th>
              <th className="border border-black px-4 py-2">備考</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-black">
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">
                  {item.配達日1}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.配達時間1}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.搬入返却場所}
                </td>
                <td className="border border-black px-4 py-2">{item.取場所}</td>
                <td className="border border-black px-4 py-2">
                  {item.コンテナサイズ}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.コンテナNo}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.シャーシ留置費}
                </td>
                <td className="border border-black px-4 py-2">{item.work1}</td>
                <td className="border border-black px-4 py-2">{item.work2}</td>
                <td className="border border-black px-4 py-2">{item.work3}</td>
                <td className="border border-black px-4 py-2">{item.work4}</td>
                <td className="border border-black px-4 py-2">{item.work5}</td>
                <td className="border border-black px-4 py-2">{item.work6}</td>
                <td className="border border-black px-4 py-2">
                  {item.識別コード}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.請求書備考}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestListPage;
