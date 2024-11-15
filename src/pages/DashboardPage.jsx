import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
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

  const startOfMonth = selectedDate.startOf("month");
  const endOfMonth = selectedDate.endOf("month");
  const lastYearStart = startOfMonth.subtract(1, "year");
  const lastYearEnd = endOfMonth.subtract(1, "year");
  const lastMonthStart = startOfMonth.subtract(1, "month");
  const lastMonthEnd = endOfMonth.subtract(1, "month");

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
      onCell: (record, rowIndex) => {
        return {
          style: {
            padding: "10px",
            width: "150px",
            height: "20px ",
          },
        };
      },
    },
    {
      title: `${lastYearLastMonthEnd.format("YYYY-MM")} `,
      dataIndex: "lastYearLastMonthPrice",
      key: "lastYearLastMonthPrice",
      align: "center",
      onCell: (record, rowIndex) => {
        return {
          style: {
            padding: "10px",
          },
        };
      },
    },
    {
      title: `${thisYearLastMonthEnd.format("YYYY-MM")} `,
      dataIndex: "thisYearLastMonthPrice",
      key: "thisYearLastMonthPrice",
      align: "center",
      onCell: (record, rowIndex) => {
        return {
          style: {
            padding: "10px",
          },
        };
      },
    },
    {
      title: `${lastYearEnd.format("YYYY-MM")} `,
      dataIndex: "lastYearThisMonthPrice",
      key: "lastYearThisMonthPrice",
      align: "center",
      onCell: (record, rowIndex) => {
        return {
          style: {
            padding: "10px",
          },
        };
      },
    },
    {
      title: `${endOfMonth.format("YYYY-MM")} `,
      dataIndex: "thisYearThisMonthPrice",
      key: "thisYearThisMonthPrice",
      align: "center",
      onCell: (record, rowIndex) => {
        return {
          style: {
            padding: "10px",
          },
        };
      },
    },
  ];

  const calculateTotalPricesForEachDay = () => {
    const today = dayjs().startOf("day");

    const last7Days = Array.from({ length: 7 }, (_, i) =>
      today.subtract(i, "day"),
    );

    return last7Days.map((date) => {
      const totalPriceForDay = companyList.reduce((total, companyItem) => {
        const matchedPdfItem = pdfList.find(
          (pdfItem) =>
            pdfItem.下払会社名 === companyItem &&
            dayjs(pdfItem.updatedAt).isSame(date, "day"),
        );

        return total + (matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0);
      }, 0); // Initial total is 0

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

  const calculateTotalPricesForEachDays = () => {
    const today = dayjs().startOf("day");

    const last7Days = Array.from({ length: 7 }, (_, i) =>
      today.subtract(i, "day"),
    );

    return last7Days.map((date) => {
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
  const calendar = () => {
    navigate("/orders_invoices/calendar");
  };
  const totalPricesForLast7Dayss = calculateTotalPricesForEachDays();

  const weeklyCustomer = totalPricesForLast7Dayss
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => item.totalPrice);

  return (
    <div className="flex flex-col xl:flex-col w-full gap-2">
      <div className="flex-col xl:h-96 xl:flex-row flex gap-2">
        <div className="xl:w-1/3 h-full mb-2">
          <div className="h-[47.36842%] bg-bg-light rounded-lg mb-2">
            <TotalAmount company={weeklyCompany} customer={weeklyCustomer} />
          </div>
          <div className="h-[calc(52.6317%-8px)] mb- bg-bg-light rounded-lg">
            <AllChart company={weeklyCompany} customer={weeklyCustomer} />
          </div>
        </div>
        <div className="xl:w-2/3 h-fyll hidden md:block bg-bg-light rounded-lg">
          <CompanyCharts category={companyList} data={companyPriceList} />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row xl:h-96 justify-between gap-2 w-full">
        <div className="xl:w-1/3 h-[400px] bg-bg-light rounded-lg">
          {customerList.length > 0 && (
            <Customer label={customerList} series={customerPrice} />
          )}
        </div>
        <div className="xl:w-1/3 hidden md:block h-[400px] bg-bg-light rounded-lg">
          <CTable
            dataSource={combined}
            columns={columns}
            pagination={true}
            ps={5}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
        <div className="xl:w-1/3 h-[400px] bg-bg-light rounded-lg">
          {companyList.length > 0 && (
            <Comapany label={companyList} series={companyPrice} />
          )}
        </div>
      </div>
      <FloatButton
        shape="square"
        type="primary"
        className="mb-2 mr-2 animate-bounce"
        onClick={calendar}
        icon={<CalendarOutlined />}
      />
    </div>
  );
};

export default Dashboardpage;
