// BarChart.js
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import dayjs from "dayjs";

const BarChart = (props) => {
  const companyData = props.company;
  const customerData = props.customer;
  const localStorageTheme = localStorage.getItem("theme");
  const textColor =
    localStorageTheme === "dark"
      ? "#AFB6C1D9 !important"
      : "#5B5C5FE0 !important";
  const generateLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      dates.push(dayjs().subtract(i, "day").format("DD MMM"));
    }
    return dates;
  };
  const options = {
    series: [
      {
        name: "顧客",
        color: "#31C48D",
        data: customerData,
      },
      {
        name: "協力会社",
        color: "#F05252",
        data: companyData,
      },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 200,
      toolbar: {
        show: true,
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      style: {
        color: textColor,
      },
      dropShadow: {
        enabled: true,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        color: textColor,
        "background-color": textColor,
      },
      formatter: function (value) {
        return value + "円";
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Noto Sans JP, Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
      categories: generateLast7Days(),
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Noto Sans JP, Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20,
      },
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(document.getElementById("bar-chart"), options);
    chart.render();

    return () => {
      chart.destroy(); // Clean up on unmount
    };
  }, [options]);

  return <div id="bar-chart" />;
};

export default BarChart;
