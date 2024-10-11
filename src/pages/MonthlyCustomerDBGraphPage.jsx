import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";

const MonthlyCustomerDBGraphPage = () => {
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [company, setCompany] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("month")); // Set default to this year and this month
  const { theme } = useContext(ThemeContext);

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

  const customers = customer.map((item) => item.顧客名称);

  const calculatePrices = (startDate, endDate) => {
    return customers.map((customerItem) => {
      const matchedPdfItem = order.find((orderItem) => {
        const orderDate = dayjs(orderItem.createdAt);
        return (
          orderItem.顧客名 === customerItem &&
          orderDate.isAfter(startDate) &&
          orderDate.isBefore(endDate)
        );
      });

      return {
        Price: matchedPdfItem
          ? Number(
              matchedPdfItem.基本料金1 +
                matchedPdfItem.基本料金2 +
                matchedPdfItem.基本料金3,
            )
          : 0,
      };
    });
  };

  // Calculate based on selected date
  const startOfMonth = selectedDate.startOf("month");
  const endOfMonth = selectedDate.endOf("month");
  const lastYearStart = startOfMonth.subtract(1, "year");
  const lastYearEnd = endOfMonth.subtract(1, "year");
  const lastMonthStart = startOfMonth.subtract(1, "month");
  const lastMonthEnd = endOfMonth.subtract(1, "month");

  const lastMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd);
  const lastYearPrice = calculatePrices(lastYearStart, lastYearEnd);
  const thisYearPrice = calculatePrices(startOfMonth, endOfMonth);
  const thisMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd); // Assuming this for demonstration

  const combined = customers.map((customer, index) => {
    return {
      customer: customer,
      lastMonthPrice: lastMonthPrice[index].Price,
      lastYearPrice: lastYearPrice[index].Price,
      thisYearPrice: thisYearPrice[index].Price,
      thisMonthPrice: thisMonthPrice[index].Price,
    };
  });

  const columns = [
    { title: "顧客名", dataIndex: "customer", key: "customer" },
    { title: "先月", dataIndex: "lastMonthPrice", key: "lastMonthPrice" },
    { title: "昨年", dataIndex: "lastYearPrice", key: "lastYearPrice" },
    { title: "今月", dataIndex: "thisMonthPrice", key: "thisMonthPrice" },
    { title: "今年", dataIndex: "thisYearPrice", key: "thisYearPrice" },
  ];

  const lineData = combined
    .map((item) => ({
      x: item.customer,
      y: item.lastMonthPrice,
      category: "先月",
    }))
    .concat(
      combined.map((item) => ({
        x: item.customer,
        y: item.lastYearPrice,
        category: "昨年",
      })),
      combined.map((item) => ({
        x: item.customer,
        y: item.thisYearPrice,
        category: "今年",
      })),
      combined.map((item) => ({
        x: item.customer,
        y: item.thisMonthPrice,
        category: "今月",
      })),
    );

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
      type: "先月",
      value: combined.reduce((sum, item) => sum + item.lastMonthPrice, 0),
    },
    {
      type: "昨年",
      value: combined.reduce((sum, item) => sum + item.lastYearPrice, 0),
    },
    {
      type: "今月",
      value: combined.reduce((sum, item) => sum + item.thisMonthPrice, 0),
    },
    {
      type: "今年",
      value: combined.reduce((sum, item) => sum + item.thisYearPrice, 0),
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
      <h1 className="text-center text-2xl font-bold mb-4">顧客別月次グラフ</h1>
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
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
      <div className="flex flex-wrap flex-row items-center gap-5 w-full pt-5">
        <div className="flex-1 min-w-[250px] text-center">
          <h2>月次比較</h2>
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

export default MonthlyCustomerDBGraphPage;
