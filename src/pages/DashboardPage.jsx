// import { Line, Column } from "@ant-design/plots";
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { BidirectionalBar } from "@ant-design/plots";

// const Dashboardpage = () => {
//   const [order, setOrder] = useState([]);
//   const [customer, setCustomer] = useState([]);
//   const [company, setCompany] = useState([]);
//   const [pdfList, setPdfList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [customers, companies, orders, pdfLists] = await Promise.all([
//           axios.get(process.env.REACT_API_BASE_URL + `/customer`),
//           axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
//           axios.get(process.env.REACT_API_BASE_URL + `/order`),
//           axios.get(process.env.REACT_API_BASE_URL + `/pdfList`),
//         ]);
//         setOrder(orders.data);
//         setCustomer(customers.data);
//         setCompany(companies.data);
//         setPdfList(pdfLists.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const companyList = company.map((item) => item.協力会社);
//   const customerList = customer.map((item) => item.顧客名称);

//   const result = companyList.map((item) => {
//     // Find the matching pdf item for the current company
//     const matchedPdfItem = pdfList.find(
//       (pdfItem) => pdfItem.下払会社名 === item,
//     );

//     // Return the object with the company name and corresponding price
//     return {
//       協力会社: item,
//       Price: matchedPdfItem ? Number(matchedPdfItem.基本料金) : 0, // Use matched price or 0 if no match
//     };
//   });

//   const customerConfig = customerList.map((item) => {
//     const matchedOrderItem = order.find(
//       (orderItem) => orderItem.顧客名 === item,
//     );
//     return {
//       顧客名: item,
//       Price: matchedOrderItem
//         ? Number(
//             matchedOrderItem.基本料金1 +
//               matchedOrderItem.基本料金2 +
//               matchedOrderItem.基本料金3,
//           )
//         : 0,
//     };
//   });

//   const config2 = {
//     data: customerConfig, // Pass the result array here
//     xField: "顧客名", // X-axis will show the company names
//     yField: "Price", // Y-axis will show the prices
//     label: {
//       // Show the Price value on each column
//       content: (data) => `${data.Price}`,
//       position: "middle", // Label position
//       style: {
//         fill: "#FFFFFF", // White text color
//         fontSize: 10,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       協力会社: { alias: "Company" },
//       Price: { alias: "Price" },
//     },
//     style: {
//       // Rounded corner style
//       radiusTopLeft: 10,
//       radiusTopRight: 10,
//     },
//   };

//   // const config1 = {
//   //   data: {
//   //     type: "fetch",
//   //     value:
//   //       "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json",
//   //   },
//   //   xField: "月份",
//   //   yField: "月均降雨量",
//   //   colorField: "name",
//   //   group: true,
//   //   style: {
//   //     // 矩形四个方向的内边距
//   //     inset: 5,
//   //     // 矩形单个方向的内边距
//   //     // insetLeft:5,
//   //     // insetRight:20,
//   //     // insetBottom:10
//   //     // insetTop:10
//   //   },
//   // };

//   const config = {
//     data: result,
//     xField: "協力会社", // X-axis will show the company names
//     yField: "Price", // Y-axis will show the prices
//     onReady: ({ chart }) => {
//       try {
//         const { height } = chart._container.getBoundingClientRect();
//         const tooltipItem = data[Math.floor(Math.random() * data.length)];
//         chart.on(
//           "afterrender",
//           () => {
//             chart.emit("tooltip:show", {
//               data: {
//                 data: tooltipItem,
//               },
//               offsetY: height / 2 - 60,
//             });
//           },
//           true,
//         );
//       } catch (e) {
//         console.error(e);
//       }
//     },
//   };

//   const data = [
//     {
//       country: "乌拉圭",
//       "2016年耕地总面积": 13.4,
//       "2016年转基因种植面积": 12.3,
//     },
//     {
//       country: "巴拉圭",
//       "2016年耕地总面积": 14.4,
//       "2016年转基因种植面积": 6.3,
//     },
//     {
//       country: "南非",
//       "2016年耕地总面积": 18.4,
//       "2016年转基因种植面积": 8.3,
//     },
//     {
//       country: "巴基斯坦",
//       "2016年耕地总面积": 34.4,
//       "2016年转基因种植面积": 13.8,
//     },
//     {
//       country: "阿根廷",
//       "2016年耕地总面积": 44.4,
//       "2016年转基因种植面积": 19.5,
//     },
//     {
//       country: "巴西",
//       "2016年耕地总面积": 24.4,
//       "2016年转基因种植面积": 18.8,
//     },
//     {
//       country: "加拿大",
//       "2016年耕地总面积": 54.4,
//       "2016年转基因种植面积": 24.7,
//     },
//     {
//       country: "中国",
//       "2016年耕地总面积": 104.4,
//       "2016年转基因种植面积": 5.3,
//     },
//     {
//       country: "美国",
//       "2016年耕地总面积": 165.2,
//       "2016年转基因种植面积": 72.9,
//     },
//   ];
//   const configMonth = {
//     data,
//     xField: "country",
//     yField: ["2016年耕地总面积", "2016年转基因种植面积"],
//     style: {
//       fill: (d) => {
//         if (d.groupKey === "2016年转基因种植面积") return "#64DAAB";
//         return "#6395FA";
//       },
//     },
//   };

//   return (
//     <div className="w-full flex justify-between h-auto text-center overflow overflow-scroll bg-white text-black">
//       {/* <Column className="w-2/4 h-[200px] " {...config1} /> */}
//       <div className="w-1/3"></div>
//       <div className="w-1/3 h-full">
//         <Column className=" h-[200px] bg-white" {...config} />
//         <text>This is scammer</text>
//         <Column className=" h-[200px] bg-white mt-10" {...config2} />
//         <text>This is scammer</text>
//         <Column className="h-[200px] bg-white mt-10"></Column>
//       </div>
//       <div className="w-1/3 h-full">
//         <BidirectionalBar {...configMonth} />
//       </div>
//       <div className="h-[200px]">
//         <table></table>
//       </div>
//     </div>
//   );
// };

// export default Dashboardpage;

import axios from "axios";
import { Table, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import ReactApexChart from "react-apexcharts";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";

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
  console.log(companyPriceList);
  console.log(companyList);
  const combined = companyPriceList.map((value, index) => {
    return {
      type: companyList[index],
      value: value,
    };
  });
  const config = {
    data: combined,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  class CompanyChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        series: [
          {
            name: "Price",
            data: companyPriceList,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 1,
              columnWidth: "100%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 0,
          },
          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: companyList,
            tickPlacement: "on",
          },
          yaxis: {
            title: {
              text: "Prices",
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal",
              shadeIntensity: 0.25,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100],
            },
          },
        },
      };
    }

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      );
    }
  }
  class CustomerChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        series: [
          {
            name: "Price",
            data: customerPriceList,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 1,
              columnWidth: "100%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 0,
          },
          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: customerList,
            tickPlacement: "on",
          },
          yaxis: {
            title: {
              text: "Prices",
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal",
              shadeIntensity: 0.25,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100],
            },
          },
        },
      };
    }

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      );
    }
  }

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
  return (
    <div className="w-full flex justify-between h-[800px] text-center overflow-hidden bg-white gap-4 text-black">
      <div className="flex flex-col w-2/3 h-1/2 gap-4 justify-between ">
        <div className="flex flex-row gap-4 justify-between">
          <div className=" h-full w-full border overflow-hidden border-gray-300 ">
            <CompanyChart />
          </div>
          <div className=" h-full w-full border overflow-hidden border-gray-300 ">
            <CustomerChart />
          </div>
        </div>
        <div>
          <div className=" w-full h-[400px] border overflow-scroll border-gray-300 pl-5 pr-5 pt-2">
            <div className="pb-2">
              <DatePicker
                picker="month"
                className="grow max-w-96"
                value={selectedDate} // Set the value of the DatePicker
                onChange={handleDateChange} // Handle date change
              />
            </div>
            <div className="">
              <Table
                dataSource={combineds}
                columns={columns}
                pagination={true}
                bordered
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full ">
        <Pie {...config} />
      </div>
    </div>
  );
};

export default Dashboardpage;
