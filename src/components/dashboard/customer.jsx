import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import Color from "../Color";

const CustomerPage = (props) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const prices = props.series.map((item) => item.Price);
  const colors = prices.map((price) => getRandomColor());
  const labels = props.label;

  const localStorageTheme = localStorage.getItem("theme");

  const textColor =
    localStorageTheme === "dark"
      ? "#AFB6C1D9 !important"
      : "#5B5C5FE0 !important";

  const getChartOptions = () => {
    return {
      series: prices,
      colors: colors,
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Noto Sans JP, Inter, sans-serif",
                offsetY: 20,
                style: {
                  color: textColor, // Set the text color
                },
              },
              total: {
                showAlways: true,
                show: true,
                label: "合計料金",
                fontFamily: "Noto Sans JP, Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return sum + "円";
                },
                color: textColor,
              },
              value: {
                show: true,
                fontFamily: "Noto Sans JP, Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return value + "円";
                },
                color: textColor,
              },
            },
            size: "60%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: labels,
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "bottom",
        fontFamily: "Noto Sans JP,Inter, sans-serif",
        labels: {
          colors: textColor, // Set the legend text color
        },
      },
    };
  };

  useEffect(() => {
    const chart = new ApexCharts(
      document.getElementById("customer-chart"),
      getChartOptions(),
    );
    chart.render();

    // Handle the checkbox change event
    const handleCheckboxChange = (event) => {
      const checkbox = event.target;
      if (checkbox.checked) {
        switch (checkbox.value) {
          case "desktop":
            chart.updateSeries(prices);
            break;
          case "tablet":
            chart.updateSeries(prices);
            break;
          case "mobile":
            chart.updateSeries(prices);
            break;
          default:
            chart.updateSeries(prices);
        }
      } else {
        chart.updateSeries(prices);
      }
    };

    // Get all the checkboxes and attach the event listener
    const checkboxes = document.querySelectorAll(
      '#devices input[type="checkbox"]',
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleCheckboxChange);
    });

    // Cleanup event listeners and chart on unmount
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", handleCheckboxChange);
      });
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <div
        id="customer-chart"
        style={{ height: 320, width: "100%", color: textColor }}>
        {/* The chart will render here */}
      </div>
    </div>
  );
};

export default CustomerPage;
