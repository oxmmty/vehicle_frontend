import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Typography, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const RequestListPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pdfDate, setPdfDate] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const componentRef = useRef();

  useEffect(() => {
    // Fetch order data
    axios.get(`${process.env.REACT_API_BASE_URL}/order`).then((response) => {
      const transformedData = response.data.map((item) => ({
        ...item,
        配達日1: moment(item.配達日1).format("YYYY-MM"), // Format delivery date
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

    // Fetch company data
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
  }, [selectedCompany, selectedDate, data]); // Added 'data' to dependencies

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

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM");
      filtered = filtered.filter(
        (item) => moment(item.配達日1).format("YYYY-MM") === formattedDate,
      );
      setPdfDate(formattedDate);
    }

    setFilteredData(filtered);
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
      fixed: "left",
    },
    {
      title: "配達日",
      dataIndex: "配達日1",
      key: "配達日1",
    },
    {
      title: "時間",
      dataIndex: "配達時間1",
      key: "配達時間1",
    },
    {
      title: "搬出・搬入",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
    },
    {
      title: "作業先",
      dataIndex: "取場所",
      key: "取場所",
    },
    {
      title: "サイズ",
      dataIndex: "コンテナサイズ",
      key: "コンテナサイズ",
    },
    {
      title: "コンテナ番号",
      dataIndex: "コンテナNo",
      key: "コンテナNo",
    },
    {
      title: "シャーシ",
      dataIndex: "シャーシ留置費",
      key: "シャーシ留置費",
    },
    {
      title: "作業 1",
      dataIndex: "work1",
      key: "work1",
    },
    {
      title: "作業 2",
      dataIndex: "work2",
      key: "work2",
    },
    {
      title: "作業 3",
      dataIndex: "work3",
      key: "work3",
    },
    {
      title: "作業 4",
      dataIndex: "work4",
      key: "work4",
    },
    {
      title: "作業 5",
      dataIndex: "work5",
      key: "work5",
    },
    {
      title: "作業 6",
      dataIndex: "work6",
      key: "work6",
    },
    {
      title: "識別コード",
      dataIndex: "識別コード",
      key: "識別コード",
    },
    {
      title: "備考",
      dataIndex: "請求書備考",
      key: "請求書備考",
    },
  ];

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>配車リスト</title>
          <style>
            body { margin: 0; padding: 10px; font-family: Arial, sans-serif; background-color: white; }
            h2 { text-align: center; }
            p { font-size: 10px; }
            table { width: 100%; border-collapse: collapse; text-align: left; font-size: 10px; }
            th, td { border: 1px solid black; padding: 2px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <p>配車リスト</p>
          <h2>${selectedCompany}</h2>
          <div style="display: flex; justify-content: space-between;">
            <div><p>${pdfDate}</p></div>
            <div><p>翔風運輸株式会社　担当：渡邉</p><p>${today}</p></div>
          </div>
          <table>
            <thead>
              <tr>
                ${columns.map((col) => `<th>${col.title}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (row) => `
                  <tr>
                    ${columns
                      .map(
                        (col) =>
                          `<td>${
                            row[col.dataIndex] !== undefined &&
                            row[col.dataIndex] !== null
                              ? row[col.dataIndex]
                              : ""
                          }</td>`,
                      )
                      .join("")}
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
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
            picker="month"
            onChange={handleDateChange}
            format="YYYY/MM"
            allowClear
          />
        </div>
        <div className="text-center">
          <Title level={5}>翔風運輸株式会社　担当：渡邉</Title>
          <Text>{today}</Text>
        </div>

        <Button type="primary" onClick={handlePrint}>
          PDF作成
        </Button>
      </div>

      <div ref={componentRef}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ x: "max-content" }}
          bordered
        />
      </div>
    </div>
  );
};

export default RequestListPage;
