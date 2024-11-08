import { DatePicker, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CTable from "src/components/CTable";
import dayjs from "dayjs";
import axios from "axios";
const { Title } = Typography;

const MonthlyCustomerPage = () => {
  // const [date, setDate] = useState(dayjs().format("YYYY-MM"));

  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "鈴与カ",
  //     type: "得意先",
  //     taxTotal: 30000,
  //     nonTaxTotal: 50000,
  //     highSpeedCost: 40000,
  //     scaleCost: 60000,
  //     previousMonth: "",
  //     noTitle1: "",
  //   },
  // ];

  // const len = dataSource.length;
  // const columns = [
  //   {
  //     key: "No",
  //     title: "No",
  //     dataIndex: "key",
  //   },
  //   {
  //     key: "顧客　名称",
  //     title: "顧客　名称",
  //     dataIndex: "name",
  //   },
  //   {
  //     key: "種別",
  //     title: "種別",
  //     dataIndex: "type",
  //   },
  //   {
  //     key: "入金確認",
  //     title: "入金確認",
  //     dataIndex: "入金確認",
  //   },
  //   {
  //     key: "課税",
  //     title: "課税",
  //     dataIndex: "課税",
  //   },
  //   {
  //     key: "非課税",
  //     title: "非課税",
  //     dataIndex: "非課税",
  //   },
  //   {
  //     key: "高速代<br>（内税）",
  //     title: (
  //       <div>
  //         高速代
  //         <br />
  //         （内税）
  //       </div>
  //     ),
  //     dataIndex: "高速代<br>（内税）",
  //   },
  //   {
  //     key: "高速代",
  //     title: "高速代",
  //     dataIndex: "高速代",
  //   },
  //   {
  //     key: "高速代<br>（消費税）",
  //     title: (
  //       <div>
  //         高速代
  //         <br />
  //         （消費税）
  //       </div>
  //     ),
  //     dataIndex: "高速代<br>（消費税）",
  //   },
  //   {
  //     key: "税抜合計",
  //     title: "税抜合計",
  //     dataIndex: "税抜合計",
  //   },
  //   {
  //     key: "消費税",
  //     title: "消費税",
  //     dataIndex: "消費税",
  //   },
  //   {
  //     key: "入金合計",
  //     title: "入金合計",
  //     dataIndex: "入金合計",
  //   },
  //   {
  //     key: "入金日",
  //     title: "入金日",
  //     dataIndex: "入金日",
  //   },
  //   {
  //     key: "前月比",
  //     title: "前月比",
  //     dataIndex: "previousMonth",
  //     onCell: (_, index) => ({
  //       colSpan: index === len + 5 ? 2 : 1,
  //     }),
  //   },
  //   {
  //     key: "買掛計<br>税抜",
  //     title: (
  //       <div>
  //         買掛計
  //         <br />
  //         税抜
  //       </div>
  //     ),
  //     dataIndex: "買掛計<br>税抜",
  //     onCell: (_, index) => ({
  //       colSpan: index === len + 5 ? 0 : 1,
  //     }),
  //   },
  //   {
  //     key: "支払比率",
  //     title: "支払比率",
  //     dataIndex: "支払比率",
  //   },
  //   {
  //     key: "1",
  //     title: "",
  //     dataIndex: "noTitle1",
  //   },
  //   {
  //     key: "2",
  //     title: "",
  //     dataIndex: "noTitle2",
  //   },
  // ];

  // const inseartHeader = () => {
  //   const header = [
  //     "前月",
  //     "翌末",
  //     "翌々末",
  //     "合計",
  //     "小計",
  //     "",
  //     "支払合計(課税＋非課税）",
  //     "差益",
  //     "差益率",
  //     "売上前月比",
  //     "売上前年同月比",
  //     "得意先売上",
  //     "得意先下払利率",
  //     "協力会社売上",
  //     "協力会社下払利率",
  //   ];
  //   header.map((item, index) => {
  //     if (index == 5) {
  //       dataSource.push({ previousMonth: "実際の売掛数値", noTitle1: "誤差" });
  //     } else dataSource.push({ type: item });
  //   });
  // };

  // inseartHeader();

  // const onChange = (_, dateString) => {
  //   setDate(dateString);
  // };

  const [date, setDate] = useState(dayjs().format("YYYY-MM"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/orderList");
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

  console.log(filteredDatas);
  const handleDateChange = (date) => {
    if (date) {
      setDate(date);
      filterData(date.format("YYYY-MM"), datas);
    }
  };

  const a = filteredDatas.map((item) => ({
    customerName: item["顧客名"],
    status: item["支払い確認"],
    basicFee: item["基本料金1"],
    basicFeeTaxable: item["基本課税1"],
    basicFee3: item["基本料金3"],
    basicFeeTaxable3: item["基本課税3"],
    basicFee2: item["基本料金2"],
    basicFeeTaxable2: item["基本課税2"],
    otherCosts: item["その他費用"],
    otherCostsTaxable: item["その他課税"],
    otherCosts2: item["その他費用2"],
    otherCostsTaxable2: item["その他課税2"],
    otherCosts3: item["その他費用3"],
    otherCostsTaxable3: item["その他課税3"],
    chassisStorageFee: item["シャーシ留置費"],
    chassisStorageFeeTaxable: item["シャーシ留置費課税1"],

    chassisStorageFee2: item["シャーシ留置費2"],
    chassisStorageFeeTaxable2: item["シャーシ留置費課税2"],
    chassisStorageFee3: item["シャーシ留置費3"],
    chassisStorageFeeTaxable3: item["シャーシ留置費課税3"],
    scaleFee: item["スケール費"],
    scaleFeeTaxable: item["スケール費課税1"],
    scaleFee2: item["スケール費2"],
    scaleFeeTaxable2: item["スケール費課税2"],
    scaleFee3: item["スケール費3"],
    scaleFeeTaxable3: item["スケール費課税3"],
    支払日: item.updatedAt,
    month: item.createdAt,
    angleFee: item["3軸料金1"],
    angleFeeTaxable: item["3軸課税1"],
    angleFee2: item["3軸料金2"],
    angleFeeTaxable2: item["3軸課税2"],
    angleFee3: item["3軸料金3"],
    angleFeeTaxable3: item["3軸課税3"],
    cruFee: item["CRU変更料金1"],
    cruFeeTaxable: item["CRU変更課税1"],
    cruFee2: item["CRU変更料金2"],
    cruFeeTaxable2: item["CRU変更課税2"],
    cruFee3: item["CRU変更料金3"],
    cruFeeTaxable3: item["CRU変更課税3"],
    highSpeed: item["高速費"],
    highSpeed2: item["高速費2"],
    highSpeed3: item["高速費3"],
  }));

  const updatedData = a.map((item) => {
    let taxed = 0;
    let nonTaxed = 0;
    let highSpeedValue = 0;
    const addAmount = (amount, isTaxable) => {
      if (amount !== null) {
        const value = parseFloat(amount);
        if (isTaxable) {
          taxed += value * 1.1;
        } else {
          nonTaxed += value;
        }
      }
    };

    const highSpeedAmount = (amount) => {
      if (amount !== null) {
        const value = parseFloat(amount);
        highSpeedValue += value * 1.1;
      }
    };

    // Process each fee or cost
    addAmount(item.basicFee, item.basicFeeTaxable);
    addAmount(item.otherCosts, item.otherCostsTaxable);
    addAmount(item.chassisStorageFee, item.chassisStorageFeeTaxable);
    addAmount(item.scaleFee, item.scaleFeeTaxable);
    addAmount(item.angleFee, item.angleFeeTaxable);
    addAmount(item.cruFee, item.cruFeeTaxable);

    addAmount(item.basicFee2, item.basicFeeTaxable2);
    addAmount(item.otherCosts2, item.otherCostsTaxable2);
    addAmount(item.chassisStorageFee2, item.chassisStorageFeeTaxable2);
    addAmount(item.scaleFee2, item.scaleFeeTaxable2);
    addAmount(item.angleFee2, item.angleFeeTaxable2);
    addAmount(item.cruFee2, item.cruFeeTaxable2);

    addAmount(item.basicFee3, item.basicFeeTaxable3);
    addAmount(item.otherCosts3, item.otherCostsTaxable3);
    addAmount(item.chassisStorageFee3, item.chassisStorageFeeTaxable3);
    addAmount(item.scaleFee3, item.scaleFeeTaxable3);
    addAmount(item.angleFee3, item.angleFeeTaxable3);
    addAmount(item.cruFee3, item.cruFeeTaxable3);

    highSpeedAmount(item.highSpeed);
    highSpeedAmount(item.highSpeed2);
    highSpeedAmount(item.highSpeed3);

    return {
      ...item,
      課税: Math.round(taxed),
      非課税: Math.round(nonTaxed),
      税抜合計: Math.round(taxed / 1.1 + nonTaxed),
      消費税: Math.round(taxed / 11),
      支払合計: Math.round(taxed + nonTaxed),
      高速代内税: Math.round(highSpeedValue),
      高速代: Math.round(highSpeedValue / 1.1),
      高速代消費税: Math.round(highSpeedValue / 11),
    };
  });

  const currentMonth = dayjs().format("YYYY-MM");
  const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");
  const filteredData = updatedData.filter(
    (item) => dayjs(item.month).format("YYYY-MM") === currentMonth,
  );

  const groupedByCompany = filteredData.reduce((acc, item) => {
    if (!acc[item.customerName]) {
      acc[item.customerName] = {
        customerName: item.customerName,
        total支払合計: 0,
        max支払日: item.支払日,
        売掛計税抜: 0,
        課税: 0,
        非課税: 0,
        税抜合計: 0,
        消費税: 0,
        lastMonthTotal支払合計: 0,
        allStatusTrue: true,
        高速代内税: 0,
        高速代: 0,
        高速代消費税: 0,
      };
    }

    acc[item.customerName].total支払合計 += item.支払合計;
    acc[item.customerName].課税 += item.課税;
    acc[item.customerName].非課税 += item.非課税;
    acc[item.customerName].税抜合計 += item.税抜合計;
    acc[item.customerName].消費税 += item.消費税;
    acc[item.customerName].高速代内税 += item.高速代内税;
    acc[item.customerName].高速代 += item.高速代;
    acc[item.customerName].高速代消費税 += item.高速代消費税;

    acc[item.customerName].max支払日 = dayjs(
      acc[item.customerName].max支払日,
    ).isBefore(dayjs(item.支払日))
      ? item.支払日
      : acc[item.customerName].max支払日;

    if (item.status) {
      acc[item.customerName].売掛計税抜 += item.支払合計;
    }

    if (!item.status) {
      acc[item.customerName].allStatusTrue = false;
    }

    return acc;
  }, {});

  updatedData.forEach((item) => {
    if (dayjs(item.month).format("YYYY-MM") === lastMonth) {
      if (!groupedByCompany[item.customerName]) {
        groupedByCompany[item.customerName] = { lastMonthTotal支払合計: 0 };
      }
      groupedByCompany[item.customerName].lastMonthTotal支払合計 +=
        item.支払合計;
    }
  });

  const result = Object.values(groupedByCompany).map((company) => ({
    ...company,
    支払い比率:
      company.売掛計税抜 > 0
        ? Math.round((company.売掛計税抜 / company.total支払合計) * 100) + " %"
        : 0 + " %",
    status: company.allStatusTrue,
  }));

  const len = result.length;
  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
    },
    {
      key: "customerName",
      title: "協力会社　名称",
      dataIndex: "customerName",
    },
    {
      key: "支払い確認",
      title: "入金確認",
      dataIndex: "支払い確認",
      render: (text, record) =>
        record.status == true ? "Yes" : record.status == false ? "No" : "",
    },
    {
      key: "課税",
      title: "課税",
      dataIndex: "課税",
    },
    {
      key: "非課税",
      title: "非課税",
      dataIndex: "非課税",
    },
    {
      key: "高速代内税",
      title: (
        <div>
          高速代
          <br />
          （内税）
        </div>
      ),
      dataIndex: "高速代内税",
    },
    {
      key: "高速代",
      title: "高速代",
      dataIndex: "高速代",
    },
    {
      key: "高速代消費税",
      title: (
        <div>
          高速代
          <br />
          （消費税）
        </div>
      ),
      dataIndex: "高速代消費税",
    },
    {
      key: "税抜合計",
      title: "税抜合計",
      dataIndex: "税抜合計",
    },
    {
      key: "消費税",
      title: "消費税",
      dataIndex: "消費税",
    },
    {
      key: "total支払合計",
      title: "入金合計",
      dataIndex: "total支払合計",
    },
    {
      key: "max支払日",
      title: "入金日",
      dataIndex: "max支払日",
      render: (text) =>
        dayjs(text).isValid() ? dayjs(text).format("YYYY-MM-DD") : "",
    },
    {
      key: "lastMonthTotal支払合計",
      title: "前月比",
      dataIndex: "lastMonthTotal支払合計",
    },
    {
      key: "売掛計税抜",
      title: (
        <div>
          買掛計
          <br />
          税抜
        </div>
      ),
      dataIndex: "売掛計税抜",
      onCell: (_, index) => ({
        colSpan: index === len + 5 ? 0 : 1,
      }),
    },
    {
      key: "支払い比率",
      title: "支払い比率",
      dataIndex: "支払い比率",
    },
  ];

  return (
    <div className="flex flex-col gap-0">
      <DatePicker
        onChange={handleDateChange}
        defaultValue={dayjs(date, "YYYY-MM")}
        className="grow max-w-96"
        picker="month"
      />
      <Typography className="flex justify-center">
        <Title level={3}>{date}</Title>
      </Typography>
      <CTable
        dataSource={result}
        columns={columns}
        pagination={true}
        ps={10}
        bordered
        scroll={{ x: "max-content" }}
        className="w-full"
      />
    </div>
  );
};

export default MonthlyCustomerPage;
