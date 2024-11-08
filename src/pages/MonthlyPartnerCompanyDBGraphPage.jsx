import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const MonthlyPartnerCompanyDBGraphPage = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [company, setCompany] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("month")); // Default to this year and this month

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, companies, orders, pdfLists] = await Promise.all([
          axios.get(process.env.REACT_API_BASE_URL + `/customer`),
          axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
          axios.get(process.env.REACT_API_BASE_URL + `/order`),
          axios.get(process.env.REACT_API_BASE_URL + `/pdfList`),
        ]);
        setOrder(orders.data);
        setCustomer(customers.data);
        setCompany(companies.data);
        setPdfList(pdfLists.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const companyList = company.map((item) => item.協力会社);

  const calculatePrices = (startDate, endDate) => {
    return companyList.map((companyItem) => {
      const matchedPdfItem = pdfList.find(
        (pdfItem) =>
          pdfItem.下払会社名 === companyItem &&
          dayjs(pdfItem.作成日).isBetween(startDate, endDate, null, "[]"),
      );

      return {
        Price: matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0,
      };
    });
  };

  // Calculate prices based on selected date
  const startOfMonth = selectedDate.startOf("month");
  const endOfMonth = selectedDate.endOf("month");
  const lastYearStart = startOfMonth.subtract(1, "year");
  const lastYearEnd = endOfMonth.subtract(1, "year");
  const lastMonthStart = startOfMonth.subtract(1, "month");
  const lastMonthEnd = endOfMonth.subtract(1, "month");

  // New date calculations
  const lastYearLastMonthStart = lastYearStart.subtract(1, "month");
  const lastYearLastMonthEnd = lastYearEnd.subtract(1, "month");
  const thisYearLastMonthStart = startOfMonth.subtract(1, "month");
  const thisYearLastMonthEnd = endOfMonth.subtract(1, "month");

  const lastYearLastMonthPrice = calculatePrices(
    lastYearLastMonthStart,
    lastYearLastMonthEnd,
  );
  const lastYearThisMonthPrice = calculatePrices(lastYearStart, lastYearEnd);
  const thisYearLastMonthPrice = calculatePrices(
    thisYearLastMonthStart,
    thisYearLastMonthEnd,
  );
  const thisYearThisMonthPrice = calculatePrices(startOfMonth, endOfMonth);

  const combined = companyList.map((company, index) => {
    const lastYearLastMonthDate = lastYearLastMonthEnd.format("YYYY-MM");
    const lastYearThisMonthDate = lastYearEnd.format("YYYY-MM");
    const thisYearLastMonthDate = thisYearLastMonthEnd.format("YYYY-MM");
    const thisYearThisMonthDate = endOfMonth.format("YYYY-MM");

    return {
      company: company,
      lastYearLastMonthPrice: lastYearLastMonthPrice[index].Price,
      lastYearThisMonthPrice: lastYearThisMonthPrice[index].Price,
      thisYearLastMonthPrice: thisYearLastMonthPrice[index].Price,
      thisYearThisMonthPrice: thisYearThisMonthPrice[index].Price,
      lastYearLastMonthDate,
      lastYearThisMonthDate,
      thisYearLastMonthDate,
      thisYearThisMonthDate,
    };
  });

  const columns = [
    {
      title: "協力会社名",
      dataIndex: "company",
      key: "company",
      align: "center",
    },
    {
      title: `${lastYearLastMonthEnd.format("YYYY-MM")} `,
      dataIndex: "lastYearLastMonthPrice",
      key: "lastYearLastMonthPrice",
      align: "center",
    },
    {
      title: `${thisYearLastMonthEnd.format("YYYY-MM")} `,
      dataIndex: "thisYearLastMonthPrice",
      align: "center",
      key: "thisYearLastMonthPrice",
    },
    {
      title: `${lastYearEnd.format("YYYY-MM")} `,
      dataIndex: "lastYearThisMonthPrice",
      align: "center",
      key: "lastYearThisMonthPrice",
    },
    {
      title: `${endOfMonth.format("YYYY-MM")} `,
      dataIndex: "thisYearThisMonthPrice",
      align: "center",
      key: "thisYearThisMonthPrice",
    },
  ];

  const lineData = combined.flatMap((item) => [
    {
      x: item.company,
      y: item.lastYearLastMonthPrice,
      category: item.lastYearLastMonthDate,
    },
    {
      x: item.company,
      y: item.thisYearLastMonthPrice,
      category: item.thisYearLastMonthDate,
    },
    {
      x: item.company,
      y: item.lastYearThisMonthPrice,
      category: item.lastYearThisMonthDate,
    },
    {
      x: item.company,
      y: item.thisYearThisMonthPrice,
      category: item.thisYearThisMonthDate,
    },
  ]);

  const config = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: lineData,
    xField: "x",
    yField: "y",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    colorField: "category",
    style: {
      lineWidth: 2,
    },
  };

  const barData = [
    {
      type: `${lastYearLastMonthEnd.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.lastYearLastMonthPrice,
        0,
      ),
    },
    {
      type: `${thisYearLastMonthEnd.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.thisYearLastMonthPrice,
        0,
      ),
    },
    {
      type: `${lastYearEnd.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.lastYearThisMonthPrice,
        0,
      ),
    },
    {
      type: `${endOfMonth.format("YYYY年MM月")}`,
      value: combined.reduce(
        (sum, item) => sum + item.thisYearThisMonthPrice,
        0,
      ),
    },
  ];

  const barConfig = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: barData,
    xField: "type",
    yField: "value",
    style: {
      fill: "#2989FF",
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        return val < 0.05 ? (val * 100).toFixed(1) + "%" : "";
      },
      offset: 10,
    },
    legend: false,
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        協力会社別月次グラフ
      </h1>
      <div className="flex justify-end w-full pb-2">
        <DatePicker
          picker="month"
          className="grow max-w-96"
          value={selectedDate} // Set the value of the DatePicker
          onChange={handleDateChange} // Handle date change
        />
      </div>
      <div className="mb-4">
        <Table
          dataSource={combined}
          columns={columns}
          pagination={true}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
      <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
        <div className="flex-1 min-w-[250px] text-center">
          <h2>月次比較グラフ</h2>
          <Line {...config} />
        </div>
        <div className="flex-1 min-w-[250px] text-center">
          <h2>月次合計</h2>
          <Column {...barConfig} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyPartnerCompanyDBGraphPage;
