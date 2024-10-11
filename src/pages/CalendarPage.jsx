import React, { useState, useEffect } from "react";
import { Badge, Button, Calendar } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const getListData = (value) => {
  let listData = [];
  switch (value.date()) {
    case 1:
      listData = [
        {
          type: "warning",
          content: "MA240831-0001",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 2:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 3:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value, datas) => {
  const filteredDatas = datas.filter(dayjs(datas.請求日).format("MM") == value);
  return filteredDatas.length;
};
const CalendarPage = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_API_BASE_URL}/orderList`)
      .then((response) => {
        setDatas(response.data);
      });
  }, []);
  const monthCellRender = (value, datas) => {
    const num = getMonthData(value, datas);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex justify-evenly max-w-[500px] w-full">
        <Button>カレンダー</Button>
        <Button>カレンダー全件</Button>
      </div>
      <Calendar cellRender={cellRender} />
    </div>
  );
};
export default CalendarPage;
