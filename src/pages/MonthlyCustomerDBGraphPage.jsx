import React, { useContext, useState, useEffect } from "react";
import { DatePicker, Table } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";

const MonthlyCustomerDBGraphPage = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs()); // Default to the current month

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, orders] = await Promise.all([
          axios.get(process.env.REACT_API_BASE_URL + `/customer`),
          axios.get(process.env.REACT_API_BASE_URL + `/order`),
        ]);
        setOrder(orders.data);
        setCustomer(customers.data);
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

  // Calculate date ranges for the selected month or the current month by default
  const startOfSelectedMonth = selectedMonth.startOf("month");
  const endOfSelectedMonth = selectedMonth.endOf("month");

  const startOfLastMonth = selectedMonth.subtract(1, "month").startOf("month");
  const endOfLastMonth = selectedMonth.subtract(1, "month").endOf("month");

  const startOfSelectedMonthLastYear = selectedMonth
    .subtract(1, "year")
    .startOf("month");
  const endOfSelectedMonthLastYear = selectedMonth
    .subtract(1, "year")
    .endOf("month");

  const startOfLastMonthLastYear = selectedMonth
    .subtract(1, "year")
    .subtract(1, "month")
    .startOf("month");
  const endOfLastMonthLastYear = selectedMonth
    .subtract(1, "year")
    .subtract(1, "month")
    .endOf("month");

  // Format date values for year-month display (e.g., "2024-09")
  const selectedYearThisMonth = startOfSelectedMonth.format("YYYY-MM");
  const lastYearThisMonth = startOfSelectedMonthLastYear.format("YYYY-MM");
  const selectedYearLastMonth = startOfLastMonth.format("YYYY-MM");
  const lastYearLastMonth = startOfLastMonthLastYear.format("YYYY-MM");

  // Calculate prices for each specific period
  const selectedYearThisMonthPrice = calculatePrices(
    startOfSelectedMonth,
    endOfSelectedMonth,
  );
  const lastYearThisMonthPrice = calculatePrices(
    startOfSelectedMonthLastYear,
    endOfSelectedMonthLastYear,
  );
  const selectedYearLastMonthPrice = calculatePrices(
    startOfLastMonth,
    endOfLastMonth,
  );
  const lastYearLastMonthPrice = calculatePrices(
    startOfLastMonthLastYear,
    endOfLastMonthLastYear,
  );

  // Combine data for each customer and the respective prices for each period
  const combined = customers.map((customer, index) => {
    return {
      customer: customer,
      [lastYearLastMonth]: lastYearLastMonthPrice[index]?.Price || 0,
      [selectedYearLastMonth]: selectedYearLastMonthPrice[index]?.Price || 0,
      [lastYearThisMonth]: lastYearThisMonthPrice[index]?.Price || 0,
      [selectedYearThisMonth]: selectedYearThisMonthPrice[index]?.Price || 0,
    };
  });

  const columns = [
    { title: "顧客名", dataIndex: "customer", key: "customer" },
    {
      title: lastYearLastMonth,
      dataIndex: lastYearLastMonth,
      key: "lastYearLastMonth",
    },
    {
      title: selectedYearLastMonth,
      dataIndex: selectedYearLastMonth,
      key: "selectedYearLastMonth",
    },
    {
      title: lastYearThisMonth,
      dataIndex: lastYearThisMonth,
      key: "lastYearThisMonth",
    },
    {
      title: selectedYearThisMonth,
      dataIndex: selectedYearThisMonth,
      key: "selectedYearThisMonth",
    },
  ];

  const lineData = combined
    .map((item) => [
      {
        x: item.customer,
        y: item[lastYearLastMonth],
        category: lastYearLastMonth,
      },
      {
        x: item.customer,
        y: item[selectedYearLastMonth],
        category: selectedYearLastMonth,
      },
      {
        x: item.customer,
        y: item[lastYearThisMonth],
        category: lastYearThisMonth,
      },
      {
        x: item.customer,
        y: item[selectedYearThisMonth],
        category: selectedYearThisMonth,
      },
    ])
    .flat();

  const config = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: lineData,
    xField: "x",
    yField: "y",
    colorField: "category",
  };

  const barData = [
    {
      type: lastYearLastMonth,
      value: combined.reduce((sum, item) => sum + item[lastYearLastMonth], 0),
    },
    {
      type: selectedYearLastMonth,
      value: combined.reduce(
        (sum, item) => sum + item[selectedYearLastMonth],
        0,
      ),
    },
    {
      type: lastYearThisMonth,
      value: combined.reduce((sum, item) => sum + item[lastYearThisMonth], 0),
    },
    {
      type: selectedYearThisMonth,
      value: combined.reduce(
        (sum, item) => sum + item[selectedYearThisMonth],
        0,
      ),
    },
  ];

  const barConfig = {
    theme: theme === "light" ? "academy" : "classicDark",
    data: barData,
    xField: "type",
    yField: "value",
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">顧客別月次グラフ</h1>

      {/* DatePicker for selecting month */}
      <div className="mb-4 text-center">
        <DatePicker
          picker="month"
          value={selectedMonth}
          onChange={(date) => setSelectedMonth(date || dayjs())} // Set default to current month if no selection
          allowClear
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
