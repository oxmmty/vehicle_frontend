import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import CTable from "src/components/CTable";
import Customer from "../components/dashboard/customer";
import Comapany from "../components/dashboard/company";
import TotalAmount from "../components/dashboard/totalAmount";
import CompanyCharts from "../components/dashboard/companyChart";
import AllChart from "../components/dashboard/allChart";
const Dashboardpage = () => {
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
  const companyPrice = companyList.map((item) => {
    const matchedPdfItem = pdfList.find(
      (pdfItem) => pdfItem.下払会社名 === item,
    );
    return {
      Price: matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0,
    };
  });
  const companyPriceList = companyPrice.map((item) => item.Price);
  const customerList = customer.map((item) => item.顧客名称);
  const customerPrice = customerList.map((item) => {
    const matchedPdfItem = order.find((orderItem) => orderItem.顧客名 === item);
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

  const customerPriceList = customerPrice.map((item) => item.Price);

  const calculatePrices = (startDate, endDate) => {
    return companyList.map((companyItem) => {
      const matchedPdfItem = pdfList.find(
        (pdfItem) =>
          pdfItem.下払会社名 === companyItem &&
          dayjs(pdfItem.updatedAt).isBetween(startDate, endDate, null, "[]"),
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

  const lastMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd);
  const lastYearPrice = calculatePrices(lastYearStart, lastYearEnd);
  const thisYearPrice = calculatePrices(startOfMonth, endOfMonth);
  const thisMonthPrice = calculatePrices(lastMonthStart, lastMonthEnd); // Assuming this for demonstration

  const combineds = companyList.map((company, index) => ({
    company: company,
    lastMonthPrice: lastMonthPrice[index].Price,
    lastYearPrice: lastYearPrice[index].Price,
    thisYearPrice: thisYearPrice[index].Price,
    thisMonthPrice: thisMonthPrice[index].Price,
  }));

  const columns = [
    { title: "協力会社名", dataIndex: "company", key: "company" },
    { title: "先月", dataIndex: "lastMonthPrice", key: "lastMonthPrice" },
    { title: "昨年", dataIndex: "lastYearPrice", key: "lastYearPrice" },
    { title: "今月", dataIndex: "thisMonthPrice", key: "thisMonthPrice" },
    { title: "今年", dataIndex: "thisYearPrice", key: "thisYearPrice" },
  ];

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const calculateTotalPricesForEachDay = () => {
    const today = dayjs().startOf("day");

    // Get the last 7 days (including today)
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      today.subtract(i, "day"),
    );

    // Create an array of objects where each object holds the date and total price for all companies
    return last7Days.map((date) => {
      // For each day, sum up the prices for all companies
      const totalPriceForDay = companyList.reduce((total, companyItem) => {
        const matchedPdfItem = pdfList.find(
          (pdfItem) =>
            pdfItem.下払会社名 === companyItem &&
            dayjs(pdfItem.updatedAt).isSame(date, "day"),
        );

        // Add the company's price to the total for that day
        return total + (matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0);
      }, 0); // Initial total is 0

      // Return the date and the total price for that day
      return {
        date: date.format("YYYY-MM-DD"),
        totalPrice: totalPriceForDay,
      };
    });
  };

  const totalPricesForLast7Days = calculateTotalPricesForEachDay();

  const weeklyCompany = totalPricesForLast7Days
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date descending
    .map((item) => item.totalPrice); // Extract totalPrice values

  /////////////////

  const calculateTotalPricesForEachDays = () => {
    const today = dayjs().startOf("day");

    // Get the last 7 days (including today)
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      today.subtract(i, "day"),
    );

    // Create an array of objects where each object holds the date and total price for all companies
    return last7Days.map((date) => {
      // For each day, sum up the prices for all companies
      const totalPriceForDay = customerList.reduce((total, customerItem) => {
        const matchedOrderItem = order.find(
          (orderItem) =>
            orderItem.顧客名 === customerItem &&
            dayjs(orderItem.createdAt).isSame(date, "day"),
        );

        // Add the company's price to the total for that day
        return (
          total +
          (matchedOrderItem
            ? Number(
                matchedOrderItem.基本料金1 +
                  matchedOrderItem.基本料金2 +
                  matchedOrderItem.基本料金3,
              )
            : 0)
        );
      }, 0);

      return {
        date: date.format("YYYY-MM-DD"),
        totalPrice: totalPriceForDay,
      };
    });
  };

  const totalPricesForLast7Dayss = calculateTotalPricesForEachDays();

  const weeklyCustomer = totalPricesForLast7Dayss
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => item.totalPrice);

  /////////////////
  return (
    <>
      <div className=" h-[100%] w-full gap-2 ">
        <div className="h-[400px] justify-between flex gap-2">
          <div className="w-1/3 gap-2 mb-2">
            <div className="h-[180px]  bg-bg-light rounded-lg mb-2">
              <TotalAmount company={weeklyCompany} customer={weeklyCustomer} />
            </div>
            <div className="h-[200px] bg-bg-light rounded-lg">
              <AllChart company={weeklyCompany} customer={weeklyCustomer} />
            </div>
          </div>
          <div className="w-2/3 h-[390px] bg-bg-light rounded-lg ">
            <CompanyCharts category={companyList} data={companyPriceList} />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-1/3 h-[400px] bg-bg-light rounded-lg">
            {customerList.length > 0 && (
              <Customer label={customerList} series={customerPrice} />
            )}
          </div>
          <div className="w-1/3 h-[400px] bg-bg-light rounded-lg">
            <CTable
              dataSource={combineds}
              columns={columns}
              pagination={true}
              pn={5}
              bordered
              scroll={{ x: "max-content" }}
            />
          </div>
          <div className="w-1/3 h-[400px] bg-bg-light rounded-lg">
            {companyList.length > 0 && (
              <Comapany label={companyList} series={companyPrice} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardpage;
