import React, { useContext, useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";
import dayjs from "dayjs";

const MonthlyCustomerDBPage = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);

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

  // Calculate date ranges for each of the required periods
  const startOfCurrentMonth = dayjs().startOf("month");
  const endOfCurrentMonth = dayjs().endOf("month");

  const startOfLastMonth = dayjs().subtract(1, "month").startOf("month");
  const endOfLastMonth = dayjs().subtract(1, "month").endOf("month");

  const startOfThisMonthLastYear = dayjs().subtract(1, "year").startOf("month");
  const endOfThisMonthLastYear = dayjs().subtract(1, "year").endOf("month");

  const startOfLastMonthLastYear = dayjs()
    .subtract(1, "year")
    .subtract(1, "month")
    .startOf("month");
  const endOfLastMonthLastYear = dayjs()
    .subtract(1, "year")
    .subtract(1, "month")
    .endOf("month");

  // Format date values for year-month display (e.g., "2024-09")
  const thisYearThisMonth = startOfCurrentMonth.format("YYYY-MM");
  const lastYearThisMonth = startOfThisMonthLastYear.format("YYYY-MM");
  const thisYearLastMonth = startOfLastMonth.format("YYYY-MM");
  const lastYearLastMonth = startOfLastMonthLastYear.format("YYYY-MM");

  // Calculate prices for each specific period
  const thisYearThisMonthPrice = calculatePrices(
    startOfCurrentMonth,
    endOfCurrentMonth,
  );
  const lastYearThisMonthPrice = calculatePrices(
    startOfThisMonthLastYear,
    endOfThisMonthLastYear,
  );
  const thisYearLastMonthPrice = calculatePrices(
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
      [lastYearLastMonth]: lastYearLastMonthPrice[index].Price,
      [thisYearLastMonth]: thisYearLastMonthPrice[index].Price,
      [lastYearThisMonth]: lastYearThisMonthPrice[index].Price,
      [thisYearThisMonth]: thisYearThisMonthPrice[index].Price,
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
      title: thisYearLastMonth,
      dataIndex: thisYearLastMonth,
      key: "thisYearLastMonth",
    },
    {
      title: lastYearThisMonth,
      dataIndex: lastYearThisMonth,
      key: "lastYearThisMonth",
    },
    {
      title: thisYearThisMonth,
      dataIndex: thisYearThisMonth,
      key: "thisYearThisMonth",
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
        y: item[thisYearLastMonth],
        category: thisYearLastMonth,
      },
      {
        x: item.customer,
        y: item[lastYearThisMonth],
        category: lastYearThisMonth,
      },
      {
        x: item.customer,
        y: item[thisYearThisMonth],
        category: thisYearThisMonth,
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
      type: thisYearLastMonth,
      value: combined.reduce((sum, item) => sum + item[thisYearLastMonth], 0),
    },
    {
      type: lastYearThisMonth,
      value: combined.reduce((sum, item) => sum + item[lastYearThisMonth], 0),
    },
    {
      type: thisYearThisMonth,
      value: combined.reduce((sum, item) => sum + item[thisYearThisMonth], 0),
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
