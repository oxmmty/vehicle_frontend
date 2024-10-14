import React from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

const TotalAmount = (props) => {
  const companyData = props.company;
  const customerData = props.customer;
  const localStorageTheme = localStorage.getItem("theme");

  const textColor = localStorageTheme === "dark" ? "#AFB6C1D9" : "#5B5C5FE0";
  const generateLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      dates.push(dayjs().subtract(i, "day").format("DD MMM"));
    }
    return dates;
  };

  const options = {
    xaxis: {
      show: true,
      categories: generateLast7Days(), // Automatically generated dates
      labels: {
        show: true,
        style: {
          fontFamily: "Noto Sans, Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Noto Sans, Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    series: [
      {
        name: "協力会社",
        data: companyData,
        color: "#1A56DB",
      },
      {
        name: "顧客",
        data: customerData,
        color: "#7E3BF2",
      },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Noto Sans, Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div id="totalAmount-Chart">
      <ReactApexChart
        options={options}
        series={options.series}
        type={options.chart.type}
        height={180}
      />
    </div>
  );
};

export default TotalAmount;
