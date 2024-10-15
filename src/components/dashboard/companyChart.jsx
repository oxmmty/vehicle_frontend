// src/components/dashboard/CompanyChart.jsx

import React from "react";
import Chart from "react-apexcharts";

const CompanyChart = (props) => {
  const data = props.data;
  const category = props.category;
  const localStorageTheme = localStorage.getItem("theme");
  const textColor =
    localStorageTheme === "dark"
      ? "#AFB6C1D9 !important"
      : "#5B5C5FE0 !important";
  const chartOptions = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Sales",
        data: data,
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "16px",
        borderRadius: 0,
      },
    },
    legend: {
      show: true,
      style: {
        color: textColor,
        fontFamily: "Noto Sans JP",
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      show: true,
      width: 8,
      colors: ["transparent"],
    },
    xaxis: {
      categories: category,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "10px",
          fontFamily: "Noto Sans JP",
          fontWeight: 200,
          color: textColor,
        },
        offsetX: -2,
        // formatter: (title) => title.slice(0, 3),
      },
    },
    yaxis: {
      labels: {
        align: "left",
        style: {
          fontSize: "10px !important",
          fontFamily: "Noto Sans JP !important",
          fontWeight: 400,
          color: textColor,
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    tooltip: {
      cssClass: "bg-bg-light",
      color: textColor,
      y: {
        formatter: (value) => `${value}円`,
      },
    },
    responsive: [
      {
        breakpoint: 568,
        options: {
          chart: {
            height: 400,
          },
          plotOptions: {
            bar: {
              columnWidth: "8px",
            },
          },
          stroke: {
            width: 8,
          },
          yaxis: {
            labels: {
              align: "left",
              style: {
                fontSize: "11px",
                fontFamily: "Noto Sans JP",
                fontWeight: 400,
                color: textColor,
              },

              formatter: (value) =>
                value >= 1000 ? `${value / 1000}k円` : value,
            },
          },
        },
      },
    ],
    colors: ["#2563eb", "#d1d5db"],
    grid: {
      borderColor: "#e5e7eb",
    },
  };

  return (
    <div id="hs-single-bar-chart" className="dark">
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={380}
      />
    </div>
  );
};

export default CompanyChart;
