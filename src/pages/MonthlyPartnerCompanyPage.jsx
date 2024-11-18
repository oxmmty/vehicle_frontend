import { DatePicker, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CTable from "src/components/CTable";
import dayjs from "dayjs";
import axios from "axios";
const { Title } = Typography;

const MonthlyPartnerCompanyPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/pdfList");
        setDatas(res.data);
        filterData(dayjs().format("YYYY-MM"), res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
      const formattedDate = date.format("YYYY-MM");
      setDate(formattedDate);
      filterData(formattedDate, datas);
    }
  };
  const a = filteredDatas.map((item) => ({
    companyName: item["下払会社名"],
    status: item["支払い確認"],
    basicFee: item["基本料金"],
    basicFeeTaxable: item["基本料金課税"],
    otherCosts: item["その他費用"],
    otherCostsTaxable: item["その他費用課税"],
    chassisStorageFee: item["シャーシ留置費"],
    chassisStorageFeeTaxable: item["シャーシ留置費課税"],
    scaleFee: item["スケール費"],
    scaleFeeTaxable: item["スケール費課税"],
    支払日: item.updatedAt,
    month: item.createdAt,
    highSpeed: item["高速費"],
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
    addAmount(item.basicFee, item.basicFeeTaxable);
    addAmount(item.otherCosts, item.otherCostsTaxable);
    addAmount(item.chassisStorageFee, item.chassisStorageFeeTaxable);
    addAmount(item.scaleFee, item.scaleFeeTaxable);
    highSpeedAmount(item.highSpeed);

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
    if (!acc[item.companyName]) {
      acc[item.companyName] = {
        companyName: item.companyName,
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
    acc[item.companyName].total支払合計 += item.支払合計;
    acc[item.companyName].課税 += item.課税;
    acc[item.companyName].非課税 += item.非課税;
    acc[item.companyName].税抜合計 += item.税抜合計;
    acc[item.companyName].消費税 += item.消費税;
    acc[item.companyName].高速代内税 += item.高速代内税;
    acc[item.companyName].高速代 += item.高速代;
    acc[item.companyName].高速代消費税 += item.高速代消費税;
    acc[item.companyName].max支払日 = dayjs(
      acc[item.companyName].max支払日,
    ).isBefore(dayjs(item.支払日))
      ? item.支払日
      : acc[item.companyName].max支払日;

    if (item.status) {
      acc[item.companyName].売掛計税抜 += item.支払合計;
    }
    if (!item.status) {
      acc[item.companyName].allStatusTrue = false;
    }

    return acc;
  }, {});
  updatedData.forEach((item) => {
    if (dayjs(item.month).format("YYYY-MM") === lastMonth) {
      if (!groupedByCompany[item.companyName]) {
        groupedByCompany[item.companyName] = { lastMonthTotal支払合計: 0 };
      }
      groupedByCompany[item.companyName].lastMonthTotal支払合計 +=
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
      align: "center",
    },
    {
      key: "companyName",
      title: "協力会社　名称",
      dataIndex: "companyName",
      align: "center",
    },
    {
      key: "支払い確認",
      title: "入金確認",
      dataIndex: "支払い確認",
      align: "center",
      render: (text, record) =>
        record.status == true ? "Yes" : record.status == false ? "No" : "",
    },
    {
      key: "課税",
      title: "課税",
      dataIndex: "課税",
      align: "center",
    },
    {
      key: "非課税",
      title: "非課税",
      dataIndex: "非課税",
      align: "center",
    },
    {
      key: "高速代<br>（内税）",
      align: "center",
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
      align: "center",
    },
    {
      key: "高速代消費税",
      align: "center",
      title: (
        <div>
          高速代
          <br />
          （消費税）
        </div>
      ),
      dataIndex: "高速代<br>（消費税）",
    },
    {
      key: "税抜合計",
      title: "税抜合計",
      dataIndex: "税抜合計",
      align: "center",
    },
    {
      key: "消費税",
      title: "消費税",
      dataIndex: "消費税",
      align: "center",
    },
    {
      key: "total支払合計",
      title: "入金合計",
      dataIndex: "total支払合計",
      align: "center",
    },
    {
      key: "max支払日",
      title: "入金日",
      dataIndex: "max支払日",
      align: "center",
      render: (text) => {
        if (!text || !dayjs(text).isValid()) {
          return ""; // Return an empty string for null, undefined, or invalid dates
        }
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      key: "lastMonthTotal支払合計",
      title: "前月比",
      dataIndex: "lastMonthTotal支払合計",
      align: "center",
    },
    {
      key: "売掛計税抜",
      align: "center",
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
      align: "center",
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

export default MonthlyPartnerCompanyPage;
