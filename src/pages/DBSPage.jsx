import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table, Typography } from "antd";
import dayjs from "dayjs";
import axios from "axios";
// import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";

const DBSPage = () => {
  // const { theme } = useContext(ThemeContext);
  const [date, setDate] = useState(dayjs().startOf("month"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/pdfList");
      setDatas(res.data);
      filterData(dayjs().format("YYYY-MM"), res.data);
    };
    fetchData();
  }, []);

  const filterData = (selectedDate, dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      const invoiceDate = dayjs(item.依頼日).format("YYYY-MM");
      return invoiceDate === selectedDate;
    });
    setFilteredDatas(filtered);
  };

  const handleDateChange = (date) => {
    if (date) {
      setDate(date);
      filterData(date.format("YYYY-MM"), datas);
    }
  };

  const dataSource = [
    {
      key: "1",
      name: "ユウキトランス",
      "2022/09": 30000,
      "2023/09": 50000,
      "2022/10": 40000,
      "2023/10": 60000,
    },
    {
      key: "2",
      name: "南本牧日新",
      "2022/09": 45000,
      "2023/09": 50000,
      "2022/10": 45000,
      "2023/10": 60000,
    },
    {
      key: "3",
      name: "有限会社鴨原商事",
      "2022/09": 0,
      "2023/09": 30000,
      "2022/10": 30000,
      "2023/10": 40000,
    },
    {
      key: "4",
      name: "東洋境運株式会社",
      "2022/09": 100000,
      "2023/09": 110000,
      "2022/10": 100000,
      "2023/10": 120000,
    },
    {
      key: "5",
      name: "鈴与カーゴネット株式会社",
      "2022/09": 100000,
      "2023/09": 120000,
      "2022/10": 100000,
      "2023/10": 120000,
    },
    {
      key: "6",
      name: "鈴与株式会社",
      "2022/09": 10000,
      "2023/09": 20000,
      "2022/10": 10000,
      "2023/10": 20000,
    },
  ];

  const columns = [
    { title: "#", dataIndex: "key", key: "key" },
    { title: "協力会社名", dataIndex: "name", key: "name" },
    { title: "支払い確認", dataIndex: "2023/09", key: "2023/09" },
    { title: "課税", dataIndex: "2022/10", key: "2022/10" },
    { title: "非課税", dataIndex: "2023/10", key: "2023/10" },
    { title: "税抜合計", dataIndex: "2023/10", key: "2023/10" },
    { title: "消費税", dataIndex: "2023/10", key: "2023/10" },
    { title: "支払合計", dataIndex: "2023/10", key: "2023/10" },
    { title: "支払日", dataIndex: "2023/10", key: "2023/10" },
    { title: "前月比", dataIndex: "2023/10", key: "2023/10" },
    { title: "売掛計税抜", dataIndex: "2023/10", key: "2023/10" },
    { title: "支払い比率", dataIndex: "2023/10", key: "2023/10" },
  ];

  const a = filteredDatas.map((item) => ({
    companyName: item["下払会社名"],
    basicFee: item["基本料金"],
    basicFeeTaxable: item["基本料金課税"],
    otherCosts: item["その他費用"],
    otherCostsTaxable: item["その他費用課税"],
    chassisStorageFee: item["シャーシ留置費"],
    chassisStorageFeeTaxable: item["シャーシ留置費課税"],
    scaleFee: item["スケール費"],
    scaleFeeTaxable: item["スケール費課税"],
  }));

  console.log(a);

  const updatedData = a.map((item) => {
    let taxed = 0;
    let nonTaxed = 0;

    // Helper function to add amounts to taxed or non-taxed
    const addAmount = (amount, isTaxable) => {
      if (amount !== null) {
        const value = parseFloat(amount);
        if (isTaxable) {
          taxed += value;
        } else {
          nonTaxed += value;
        }
      }
    };

    // Process each fee or cost
    addAmount(item.basicFee, item.basicFeeTaxable);
    addAmount(item.otherCosts, item.otherCostsTaxable);
    addAmount(item.chassisStorageFee, item.chassisStorageFeeTaxable);
    addAmount(item.scaleFee, item.scaleFeeTaxable);

    return {
      ...item,
      課税: taxed,
      非課税: nonTaxed,
    };
  });

  console.log(updatedData);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">協力会社別月次</h1>
      <div className="flex justify-end w-full pb-2">
        <Typography>
          <DatePicker
            picker="month"
            value={date}
            onChange={handleDateChange}
            className="grow max-w-96"
          />
        </Typography>
      </div>
      <div className="mb-4">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default DBSPage;
