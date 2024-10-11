import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";

const MonthlyCustomerDBPage = () => {
  const { RangePicker } = DatePicker;
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [company, setCompany] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]); // Default date range

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
      const matchedOrders = order.filter((orderItem) => {
        const orderDate = dayjs(orderItem.createdAt);
        return (
          orderItem.顧客名 === customerItem &&
          orderDate.isAfter(startDate) &&
          orderDate.isBefore(endDate)
        );
      });

      const totalPrice = matchedOrders.reduce((sum, orderItem) => {
        return (
          sum +
          (Number(orderItem.基本料金1) +
            Number(orderItem.基本料金2) +
            Number(orderItem.基本料金3))
        );
      }, 0);

      return {
        Price: totalPrice,
      };
    });
  };

  // Calculate prices based on selected date range
  const startOfRange = selectedDates[0];
  const endOfRange = selectedDates[1];
  const lastYearStart = startOfRange.subtract(1, "year");
  const lastYearEnd = endOfRange.subtract(1, "year");
  const lastMonthStart = startOfRange.subtract(1, "month");
  const lastMonthEnd = endOfRange.subtract(1, "month");

  const lastMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd);
  const lastYearPrice = calculatePrices(lastYearStart, lastYearEnd);
  const thisYearPrice = calculatePrices(startOfRange, endOfRange);
  const thisMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd);

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
    .map((item) => [
      { x: item.customer, y: item.lastMonthPrice, category: "先月" },
      { x: item.customer, y: item.lastYearPrice, category: "昨年" },
      { x: item.customer, y: item.thisYearPrice, category: "今年" },
      { x: item.customer, y: item.thisMonthPrice, category: "今月" },
    ])
    .flat();

  const config = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: lineData,
    xField: "x",
    yField: "y",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    colorField: "category",
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
  };

  // Function to handle date change
  const handleDateChange = (dates) => {
    if (dates) {
      setSelectedDates(dates); // Update selected dates
    } else {
      setSelectedDates([dayjs().startOf("month"), dayjs().endOf("month")]); // Reset to default if cleared
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        協力会社別月次グラフ
      </h1>
      <div className="flex justify-end w-full pb-2">
        <RangePicker
          className="grow max-w-96"
          value={selectedDates}
          onChange={handleDateChange}
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

export default MonthlyCustomerDBPage;
